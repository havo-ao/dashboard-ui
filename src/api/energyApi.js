import energyData from "./energy_consumption_db.json";

const COST_PER_KWH = 552.7667;

const filterDataByDate = (daysAgo) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysAgo);

  return energyData.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDate && entryDate <= today;
  });
};

export const getTotalConsumption = (period) => {
  let days;
  if (period === "today") days = 1;
  else if (period === "week") days = 7;
  else if (period === "month") days = 30;
  else days = 180; // Últimos seis meses

  const filteredData = filterDataByDate(days);

  const totalKWh = filteredData.reduce((sum, entry) => {
    return (
      sum +
      (entry.lamp_consumption || 0) +
      (entry.pc_consumption || 0) +
      (entry.phone_consumption || 0) +
      (entry.scooter_consumption || 0) +
      (entry.bicicle_consumption || 0) +
      (entry.car_consumption || 0) +
      (entry.microwave_consumption || 0) +
      (entry.refrigerator_consumption || 0) +
      (entry.ups_consumption || 0)
    );
  }, 0);

  return {
    kWh: totalKWh,
    cost: totalKWh * COST_PER_KWH,
  };
};

export const getSectionConsumption = (section, period) => {
  const filteredData = filterDataByDate(
    period === "today"
      ? 1
      : period === "week"
      ? 7
      : period === "month"
      ? 30
      : 180
  );

  let totalKWh = 0;

  if (section === "General Plant") {
    totalKWh = filteredData.reduce(
      (sum, entry) =>
        sum +
        (entry.lamp_consumption || 0) +
        (entry.pc_consumption || 0) +
        (entry.phone_consumption || 0),
      0
    );
  } else if (section === "Kitchen") {
    totalKWh = filteredData.reduce(
      (sum, entry) =>
        sum +
        (entry.microwave_consumption || 0) +
        (entry.refrigerator_consumption || 0),
      0
    );
  } else if (section === "Bicycle Chargers") {
    totalKWh = filteredData.reduce(
      (sum, entry) => sum + (entry.bicicle_consumption || 0),
      0
    );
  } else if (section === "Scooter Chargers") {
    totalKWh = filteredData.reduce(
      (sum, entry) => sum + (entry.scooter_consumption || 0),
      0
    );
  } else if (section === "Car Chargers") {
    totalKWh = filteredData.reduce(
      (sum, entry) => sum + (entry.car_consumption || 0),
      0
    );
  } else if (section === "Security") {
    totalKWh = filteredData
      .filter((entry) => entry.floor === -2)
      .reduce(
        (sum, entry) =>
          sum +
          (entry.ups_consumption || 0) +
          (entry.lamp1_consumption || 0) +
          (entry.lamp2_consumption || 0) +
          (entry.pc1_consumption || 0) +
          (entry.pc2_consumption || 0) +
          (entry.phone1_consumption || 0) +
          (entry.phone2_consumption || 0),
        0
      );
  }

  return {
    kWh: totalKWh,
    cost: totalKWh * COST_PER_KWH,
  };
};

export const getEmployeeConsumption = (internalId) => {
  const employeeData = energyData.filter(
    (entry) => entry.internal_id === internalId
  );

  const calculateConsumption = (days) => {
    const filteredData = employeeData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      return entryDate >= startDate;
    });

    const totalKWh = filteredData.reduce(
      (sum, entry) =>
        sum +
        (entry.lamp_consumption || 0) +
        (entry.pc_consumption || 0) +
        (entry.phone_consumption || 0) +
        (entry.scooter_consumption || 0) +
        (entry.bicicle_consumption || 0) +
        (entry.car_consumption || 0),
      0
    );

    return { kWh: totalKWh, cost: totalKWh * COST_PER_KWH };
  };

  return {
    today: calculateConsumption(1),
    currentWeek: calculateConsumption(7),
    currentMonth: calculateConsumption(30),
    lastSixMonths: calculateConsumption(180),
    monthBreakdown: [...Array(6)].map((_, i) => ({
      month: i + 1,
      ...calculateConsumption((i + 1) * 30),
    })),
  };
};
