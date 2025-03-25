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
import { 
  getTotalConsumption, 
  getSectionConsumption,
  formatNumber 
} from "../api/energyApi";  
import "./Tab1.css";

const Tab1 = (props) => {
  const pageName = "Dashboard";
  const { sideMenuOptions } = props;
  const setSideMenu = useSideMenuUpdate();

  const [showModal, setShowModal] = useState(false);
  const [modalOptions, setModalOptions] = useState({});
  const [selectedSection, setSelectedSection] = useState("");
  const [activePeriod, setActivePeriod] = useState(null);
  const [totalConsumption, setTotalConsumption] = useState({
    today: { kWh: "0.00", cost: "0.00" },
    labourWeek: { kWh: "0.00", cost: "0.00" },
    month: { kWh: "0.00", cost: "0.00" },
  });
  
  const sections = [
    { name: "General Plant", icon: flash },
    { name: "Kitchen", icon: fastFood },
    { name: "Bicycle Chargers", icon: bicycle },
    { name: "Scooter Chargers", icon: carSport },
    { name: "Car Chargers", icon: car },
    { name: "Security", icon: shield },
  ];

  useEffect(() => {
    const fetchConsumption = async () => {
      try {
        const todayData = await getTotalConsumption("today");
        const labourWeekData = await getTotalConsumption("labour_week");
        const monthData = await getTotalConsumption("month");

        setTotalConsumption({
          today: todayData,
          labourWeek: labourWeekData,
          month: monthData,
        });
      } catch (error) {
        console.error("Error fetching consumption data:", error);
      }
    };

    fetchConsumption();
  }, []);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setModalOptions({
      name: section,
      text: "Select a period",
      icon: sections.find((sec) => sec.name === section).icon,
      periods: ["today", "labour_week", "week", "month", "sixMonths"],
    });
    setShowModal(true);
  };

  const handlePeriodClick = async (period) => {
    try {
      const sectionData = await getSectionConsumption(selectedSection, period);
      
      setActivePeriod((prev) => (prev === period ? null : period));
      setModalOptions((prev) => ({
        ...prev,
        selectedData: sectionData,
      }));
    } catch (error) {
      console.error("Error loading section data:", error);
    }
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
                      <IonCol>
                        <strong>Today:</strong> {totalConsumption.today.kWh} kWh 
                        <br />
                        <strong>Cost:</strong> ${totalConsumption.today.cost} COP
                      </IonCol>
                      <IonCol>
                        <strong>Monthly:</strong> {totalConsumption.month.kWh} kWh
                        <br />
                        <strong>Cost:</strong> ${totalConsumption.month.cost} COP
                      </IonCol>
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
                          className="ion-text-center section-col"
                          onClick={() => handleSectionClick(section.name)}
                        >
                          <IonIcon
                            icon={section.icon}
                            className="section-icon"
                          />
                          <div className="section-name">{section.name}</div>
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
                    <IonItem 
                      button 
                      onClick={() => handlePeriodClick(period)}
                      detail={false}
                    >
                      <IonLabel>
                        {period === "sixMonths"
                          ? "Last Six Months"
                          : `Current ${period.charAt(0).toUpperCase() + period.slice(1)}`}
                      </IonLabel>
                      <IonIcon
                        slot="end"
                        icon={chevronDownOutline}
                        className={isActive ? "rotate" : ""}
                      />
                    </IonItem>
                    {isActive && modalOptions.selectedData && (
                      <IonItem>
                        <IonGrid className="consumption-summary">
                          <IonRow>
                            <IonCol>
                              <strong>{modalOptions.selectedData.kWh} kWh</strong>
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            <IonCol>
                              <strong>${modalOptions.selectedData.cost} COP</strong>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
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