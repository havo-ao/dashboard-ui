import { useEffect, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonText,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonPage,
  IonRow,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from "@ionic/react";

import { bulbOutline, flashOutline, arrowBackOutline, giftOutline, trophyOutline } from 'ionicons/icons';
import CustomPage from "../main/CustomPage";
import { useSideMenuUpdate } from "../main/SideMenuProvider";
import "./Tab1.css";

const Tab1 = (props) => {
  const pageName = "Bonus";
  const { sideMenuOptions } = props;
  const setSideMenu = useSideMenuUpdate();

  const [showModal, setShowModal] = useState(false);
  const [modalOptions, setModalOptions] = useState({
    name: "",
    text: "",
    description: "",
    icon: bulbOutline,
    periods: [],
  });

  const [selectedEmployeeModal, setSelectedEmployeeModal] = useState(null); // 👉 NUEVO

  useEffect(() => {
    if (props.location.pathname === "/tabs/tab1") {
      setSideMenu({
        options: sideMenuOptions,
        side: "start",
        pageName: pageName,
      });
    }
  }, [props.location]);

  const handleSavingsClick = (label, descriptionText, employeesList) => {
    setModalOptions({
      name: label,
      text: "Detailed information",
      description: descriptionText,
      icon: flashOutline,
      periods: employeesList,
    });
    setShowModal(true);
  };

  const employeesByRange = {
    "Savings of 10 - 20 kWh / month": ["Camilo Torres", "Sofía Díaz", "Sebastián Vega"],
    "Savings of 21 - 50 kWh / month": ["Dayana Jiménez", "William Rodríguez", "Carolina Díaz"],
    "Savings from 51 - 100 kWh / month": ["Carlos Méndez", "Mariana Duarte"],
    "Savings from 101 - 200 kWh / month": ["Mateo Fernández"],
    "Savings of more than 200 kWh/ month": ["Julieta Arce"]
  };

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
                <IonCardHeader className="ion-text-center">
                  <IonIcon icon={bulbOutline} style={{ fontSize: '32px', color: '#003366', marginBottom: '0.5rem' }} />
                  <IonCardTitle>Energy saving</IonCardTitle><p></p>

                  <ion-button expand="full" fill="outline" className="uniform-button" onClick={() => handleSavingsClick("Savings of 10 - 20 kWh / month",
                    "Tickets to cultural events, cinema or theater with sustainability themes.",
                    employeesByRange["Savings of 10 - 20 kWh / month"])}>Savings of 10 - 20 kWh / month</ion-button>

                  <ion-button expand="full" fill="outline" className="uniform-button" onClick={() => handleSavingsClick("Savings of 21 - 50 kWh / month",
                    "Free access to a basket of healthy (or not so healthy) snacks for one day. Access to games in the office (ping-pong table, video games or board games).",
                    employeesByRange["Savings of 21 - 50 kWh / month"])}>Savings of 21 - 50 kWh / month</ion-button>

                  <ion-button expand="full" fill="outline" className="uniform-button" onClick={() => handleSavingsClick("Savings from 51 - 100 kWh / month",
                    "One day of remote work.",
                    employeesByRange["Savings from 51 - 100 kWh / month"])}>Savings from 51 - 100 kWh / month</ion-button>

                  <ion-button expand="full" fill="outline" className="uniform-button" onClick={() => handleSavingsClick("Savings from 101 - 200 kWh / month",
                    "Discount on gymnasiums, medical consultations or relaxation therapies.",
                    employeesByRange["Savings from 101 - 200 kWh / month"])}>Savings from 101 - 200 kWh / month</ion-button>

                  <ion-button expand="full" fill="outline" className="uniform-button" onClick={() => handleSavingsClick("Savings of more than 200 kWh / month",
                    "Ecological kit (thermos, reusable bags, sustainable cutlery). Appear on the office “Wall of Honor” as the green employee of the month.",
                    employeesByRange["Savings of more than 200 kWh/ month"])}>Savings of more than 200 kWh / month</ion-button>
                </IonCardHeader>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IonIcon icon={giftOutline} style={{ fontSize: '24px', marginRight: '8px', color: '#003366' }} />
                    <IonCardTitle style={{ margin: 0 }}>Bonus List</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <p>
                      <strong>Savings of 10 - 20 kWh / month:</strong><br />
                      Tickets to cultural events, cinema or theater with sustainability themes.<br />

                      <strong>Savings of 21 - 50 kWh / month:</strong><br />
                      Free access to a basket of healthy (or not so healthy) snacks for one day.
                      Access to games in the office (ping-pong table, video games or board games).<br />

                      <strong>Savings of 51 - 100 kWh / month:</strong><br />
                      One day of remote work.<br />

                      <strong>Savings of 101 - 200 kWh / month:</strong><br />
                      Discount on gymnasiums, medical consultations or relaxation therapies.<br />

                      <strong>Savings of more than 200 kWh / month:</strong><br />
                      Ecological kit (thermos, reusable bags, sustainable cutlery).
                      Appear on the office “Wall of Honor” as the green employee of the month.
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Modal de categoría */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar color="success">
              <IonButtons slot="start">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={arrowBackOutline} />
                </IonButton>
              </IonButtons>
              <IonTitle></IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" style={{ backgroundColor: "#d6e5d6", textAlign: "center" }}>
            <div style={{ paddingTop: "2rem" }}>
              <IonIcon icon={bulbOutline} style={{ fontSize: "48px", color: "#003366" }} />
              <h2 style={{ color: "#003366", marginTop: "1rem" }}>{modalOptions.name}</h2>
              <p style={{ color: "#003366", padding: "0 1rem", marginTop: "1rem" }}>
                {modalOptions.description}
              </p>
              <div style={{ marginTop: "2rem" }}>
                {modalOptions.periods.map((period, index) => (
                  <div key={index} onClick={() => setSelectedEmployeeModal(period)} style={{
                    backgroundColor: "white",
                    margin: "0.5rem auto",
                    padding: "1rem",
                    width: "90%",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    fontWeight: "500",
                    color: "#003366",
                    cursor: "pointer"
                  }}>
                    {period}
                  </div>
                ))}
              </div>
            </div>
          </IonContent>
        </IonModal>

        {/* Modal del empleado seleccionado */}
        <IonModal isOpen={selectedEmployeeModal !== null} onDidDismiss={() => setSelectedEmployeeModal(null)}>
          <IonHeader>
            <IonToolbar color="success">
              <IonButtons slot="start">
                <IonButton onClick={() => setSelectedEmployeeModal(null)}>
                  <IonIcon icon={arrowBackOutline} />
                </IonButton>
              </IonButtons>
              <IonTitle>Employee Info</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" style={{ backgroundColor: "#d6e5d6", textAlign: "center" }}>
            <div style={{ paddingTop: "2rem" }}>
              <IonIcon icon={trophyOutline} style={{ fontSize: "48px", color: "#003366" }} />
              <h2 style={{ color: "#003366", marginTop: "1rem" }}>{selectedEmployeeModal}</h2>
              <p style={{ color: "#003366", padding: "0 1rem", marginTop: "1rem" }}>
              </p>
            </div>
          </IonContent>
        </IonModal>

      </CustomPage>
    </IonPage>
  );
};

export default Tab1;