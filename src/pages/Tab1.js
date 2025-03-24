import { useEffect, useState } from "react";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonNote,
} from "@ionic/react";
import {
  bicycle,
  car,
  carSport,
  chevronDownOutline,
  fastFood,
  flash,
  shield,
} from "ionicons/icons";

import CustomPage from "../main/CustomPage";
import { Modal } from "../components/Modal";
import { useSideMenuUpdate } from "../main/SideMenuProvider";
import { getTotalConsumption, getSectionConsumption } from "../api/energyApi"; // Importamos el Fake API

import "./Tab1.css";

const Tab1 = (props) => {
  const pageName = "Dashboard";
  const { sideMenuOptions } = props;
  const setSideMenu = useSideMenuUpdate();

  const [showModal, setShowModal] = useState(false);
  const [modalOptions, setModalOptions] = useState({});
  const [selectedSection, setSelectedSection] = useState("");
  const [activePeriod, setActivePeriod] = useState(null); // Controla la expansión
  const [totalConsumption, setTotalConsumption] = useState({
    today: {},
    month: {},
  });

  const sections = [
    { name: "General Plant", icon: flash },
    { name: "Kitchen", icon: fastFood },
    { name: "Bicycle Chargers", icon: bicycle },
    { name: "Scooter Chargers", icon: carSport },
    { name: "Car Chargers", icon: car },
    { name: "Security", icon: shield },
  ];

  // 🔹 Cargar consumo total (Today & Monthly) al montar el componente
  useEffect(() => {
    setTotalConsumption({
      today: getTotalConsumption("today"),
      month: getTotalConsumption("month"),
    });
  }, []);

  // 🔹 Manejar clic en una sección
  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setModalOptions({
      name: section,
      text: "Select a period",
      icon: sections.find((sec) => sec.name === section).icon,
      periods: ["today", "week", "month", "sixMonths"],
    });
    setShowModal(true);
  };

  // 🔹 Manejar selección de período en el modal
  const handlePeriodClick = (period) => {
    const sectionData = getSectionConsumption(selectedSection, period);
    setActivePeriod((prev) => (prev === period ? null : period)); // Alternar expansión
    setModalOptions((prev) => ({
      ...prev,
      selectedData: sectionData,
    }));
  };

  useEffect(() => {
    if (props.location.pathname === "/tabs/tab1") {
      setSideMenu({
        options: sideMenuOptions,
        side: "start",
        pageName: pageName,
      });
    }
  }, [props.location]);

  return (
    <IonPage id={pageName}>
      <CustomPage
        contentClass="main-content"
        name={pageName}
        sideMenu={true}
        sideMenuPosition="start"
      >
        <IonGrid>
          <IonRow className="ion-text-center">
            {/* 🔹 Tarjeta de Consumo Total */}
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Total Energy Consumption</IonCardTitle>
                  <IonCardSubtitle>Summary of consumption</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <strong>Today:</strong> {totalConsumption.today.kWh} kWh
                        <br />
                        <strong>Cost:</strong>{" "}
                        {totalConsumption?.today?.cost?.toLocaleString() || ""}{" "}
                        COP
                      </IonCol>
                      <IonCol>
                        <strong>Monthly:</strong> {totalConsumption.month.kWh}{" "}
                        kWh
                        <br />
                        <strong>Cost:</strong>{" "}
                        {totalConsumption?.month?.cost?.toLocaleString()} COP
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* 🔹 Tarjeta de Consumo por Sección */}
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Energy Consumption by Section</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      {sections.map((section, index) => (
                        <IonCol
                          key={index}
                          size="6"
                          className="ion-text-center"
                          onClick={() => handleSectionClick(section.name)}
                        >
                          <IonIcon
                            icon={section.icon}
                            style={{
                              fontSize: "2rem",
                              marginBottom: "0.5rem",
                            }}
                          />
                          <div>{section.name}</div>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* 🔹 Modal para ver detalles por sección y período */}
        {showModal && modalOptions && (
          <Modal
            showModal={showModal}
            modalOptions={modalOptions}
            close={() => setShowModal(false)}
          >
            <IonList>
              {modalOptions.periods.map((period, index) => {
                const isActive = activePeriod === period;
                return (
                  <div key={index}>
                    <IonItem button onClick={() => handlePeriodClick(period)}>
                      <IonLabel>
                        {period === "sixMonths"
                          ? "Last Six Months"
                          : `Current ${
                              period.charAt(0).toUpperCase() + period.slice(1)
                            }`}
                      </IonLabel>
                      <IonIcon
                        slot="end"
                        icon={chevronDownOutline}
                        className={isActive ? "rotate" : ""}
                      />
                    </IonItem>
                    {isActive && modalOptions.selectedData && (
                      <IonItem>
                        <IonText>
                          <p>
                            <strong>{modalOptions.selectedData.kWh} kWh</strong>
                          </p>
                          <p>
                            <strong>
                              {modalOptions.selectedData.cost.toLocaleString()}{" "}
                              COP
                            </strong>
                          </p>
                        </IonText>
                      </IonItem>
                    )}
                  </div>
                );
              })}
            </IonList>
          </Modal>
        )}
      </CustomPage>
    </IonPage>
  );
};

export default Tab1;
