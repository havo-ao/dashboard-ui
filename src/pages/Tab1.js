import { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
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
import "./Tab1.css";

const ENERGY_RATE_COP_PER_KWH = 1030; // Tarifa fija en COP/kWh

const Tab1 = (props) => {
  const pageName = "Dashboard";
  const { sideMenuOptions } = props;
  const setSideMenu = useSideMenuUpdate();

  const [showModal, setShowModal] = useState(false);
  const [modalOptions, setModalOptions] = useState({});
  const [selectedSection, setSelectedSection] = useState("");
  const [activePeriod, setActivePeriod] = useState(null); // Controla la expansión

  const energyData = {
    today: { kWh: 120 },
    week: { kWh: 750 },
    month: { kWh: 3200 },
    sixMonths: { kWh: 18000 },
  };

  const sections = [
    { name: "General Plant", icon: flash },
    { name: "Kitchen", icon: fastFood },
    { name: "Bicycle Chargers", icon: bicycle },
    { name: "Scooter Chargers", icon: carSport },
    { name: "Car Chargers", icon: car },
    { name: "Security", icon: shield },
  ];

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

  const handlePeriodClick = (period) => {
    setActivePeriod((prev) => (prev === period ? null : period)); // Alternar expansión
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
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Total Energy Consumption</IonCardTitle>
                  <IonCardSubtitle>Summary of consumption</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>Today</IonCol>
                      <IonCol>Monthly</IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
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
                    {isActive && (
                      <IonItem>
                        <IonText>
                          <p>
                            <strong>{energyData[period].kWh} kWh</strong>
                          </p>
                          <p>
                            <strong>
                              {(
                                energyData[period].kWh * ENERGY_RATE_COP_PER_KWH
                              ).toLocaleString()}{" "}
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
