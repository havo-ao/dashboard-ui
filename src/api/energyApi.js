import energyData from "./energy_consumption_db.json";

const COST_PER_KWH = 552.7667;

/**
 * Formatea los valores en COP y kWh con separadores de miles/millones.
 */
const formatNumber = (value) => {
  return parseFloat(value).toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Filtra los datos según la cantidad de días.
 */
const filterDataByDate = (daysAgo) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - daysAgo);

  return energyData.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= startDate && entryDate <= today;
  });
};

/**
 * Calcula el consumo total de energía.
 */
export const getTotalConsumption = (period) => {
  const days =
    period === "today"
      ? 1
      : period === "week"
      ? 7
      : period === "month"
      ? 30
      : 180;
  const filteredData = filterDataByDate(days);

  const totalKWh = filteredData.reduce(
    (sum, entry) =>
      sum +
      (entry.lamp_consumption || 0) +
      (entry.pc_consumption || 0) +
      (entry.phone_consumption || 0) +
      (entry.scooter_consumption || 0) +
      (entry.bicicle_consumption || 0) +
      (entry.car_consumption || 0) +
      (entry.microwave_consumption || 0) +
      (entry.refrigerator_consumption || 0) +
      (entry.ups_consumption || 0),
    0
  );

  return {
    kWh: formatNumber(totalKWh),
    cost: formatNumber(totalKWh * COST_PER_KWH),
  };
};

/**
 * Obtiene el consumo de energía por sección.
 */
export const getSectionConsumption = (section, period) => {
  const days =
    period === "today"
      ? 1
      : period === "week"
      ? 7
      : period === "month"
      ? 30
      : 180;
  const filteredData = filterDataByDate(days);

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
    kWh: formatNumber(totalKWh),
    cost: formatNumber(totalKWh * COST_PER_KWH),
  };
};

/**
 * Obtiene el consumo de un empleado según su `internal_id`.
 */
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

    return {
      kWh: formatNumber(totalKWh),
      cost: formatNumber(totalKWh * COST_PER_KWH),
    };
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
