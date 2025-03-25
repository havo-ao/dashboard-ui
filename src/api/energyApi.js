import energyData from "./energy_consumption_db.json";

const COST_PER_KWH = 552.7667; 


export const formatNumber = (value) => {
  return parseFloat(value).toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


const getMultiplier = (period) => {
  switch(period) {
    case "today": return 1;
    case "week": return 7;
    case "labour_week": return 5;
    case "month": return 20; 
    case "sixMonths": return 120; 
    default: return 1;
  }
};


export const getTotalConsumption = (period) => {
  const multiplier = getMultiplier(period);
  
  const dailyKWh = energyData.reduce((sum, entry) => {
    return sum + (
      (entry.lamp_consumption || 0) +
      (entry.pc_consumption || 0) +
      (entry.phone_consumption || 0) +
      (entry.scooter_consumption || 0) +
      (entry.bicicle_consumption || 0) +
      (entry.car_consumption || 0) +
      (entry.microwave_consumption || 0) +
      (entry.refrigerator_consumption || 0) +
      (entry.ups_consumption || 0) +
      (entry.lamp1_consumption || 0) +
      (entry.lamp2_consumption || 0) +
      (entry.pc1_consumption || 0) +
      (entry.pc2_consumption || 0) +
      (entry.phone1_consumption || 0) +
      (entry.phone2_consumption || 0)
    );
  }, 0);

  const totalKWh = dailyKWh * multiplier;

  return {
    kWh: formatNumber(totalKWh),
    cost: formatNumber(totalKWh * COST_PER_KWH),
  };
};


export const getSectionConsumption = (section, period) => {
  const multiplier = getMultiplier(period);
  let dailyKWh = 0;

  switch(section) {
    case "General Plant":
      energyData.forEach(entry => {
        if (entry.floor > 0) { 
          dailyKWh += (entry.pc_consumption || 0);
          dailyKWh += (entry.phone_consumption || 0);
        }
      });
      break;

    case "Kitchen":
      const kitchenData = energyData.find(entry => entry.id === "s_1");
      if (kitchenData) {
        dailyKWh += (kitchenData.microwave_consumption || 0);
        dailyKWh += (kitchenData.refrigerator_consumption || 0);
      }
      break;

    case "Bicycle Chargers":
      energyData.forEach(entry => {
        if (entry.bicicle_consumption) {
          dailyKWh += entry.bicicle_consumption;
        }
      });
      break;

    case "Scooter Chargers":
      energyData.forEach(entry => {
        if (entry.scooter_consumption) {
          dailyKWh += entry.scooter_consumption;
        }
      });
      break;

    case "Car Chargers":
     
      const carEntries = energyData.filter(entry => entry.car_consumption);
      const totalCarConsumption = carEntries.reduce((sum, entry) => sum + entry.car_consumption, 0);
      dailyKWh += totalCarConsumption;
      break;

    case "Security":
      const securityData = energyData.find(entry => entry.id === "s_2");
      if (securityData) {
        dailyKWh += (securityData.ups_consumption || 0); 
        dailyKWh += (securityData.lamp1_consumption || 0); 
        dailyKWh += (securityData.lamp2_consumption || 0);
        dailyKWh += (securityData.pc1_consumption || 0); 
        dailyKWh += (securityData.pc2_consumption || 0);
        dailyKWh += (securityData.phone1_consumption || 0) ;
        dailyKWh += (securityData.phone2_consumption || 0);
      }
      break;
  }

  const totalKWh = dailyKWh * multiplier;

  return {
    kWh: formatNumber(totalKWh),
    cost: formatNumber(totalKWh * COST_PER_KWH),
  };
};


export const getDailySectionData = (section) => {
  let result = [];
  
  switch(section) {
    case "Car Chargers":
      result = energyData
        .filter(entry => entry.car_consumption)
        .map(entry => ({
          id: entry.id,
          consumption: entry.car_consumption
        }));
      break;
  }

  return result;
};