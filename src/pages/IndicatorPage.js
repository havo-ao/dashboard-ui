import { useEffect } from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import CustomPage from "../main/CustomPage";
import { useSideMenuUpdate } from "../main/SideMenuProvider";
import "./IndicatorPage.css"; // ✅ Ruta corregida para el archivo CSS

const IndicatorPage = (props) => {
  const pageName = "Indicators";
  const setSideMenu = useSideMenuUpdate();

  useEffect(() => {
    if (setSideMenu) {
      setSideMenu({
        options: props.sideMenuOptions || [],
        side: "start",
        pageName: pageName,
      });
    }
  }, [props.sideMenuOptions, setSideMenu]);

  return (
    <IonPage id={pageName} className="custom-background">
      <CustomPage name={pageName} sideMenu={true} sideMenuPosition="end">
        <IonContent fullscreen className="custom-background">
          <div className="page-container">
            {/* Encabezado */}
            <div className="header">
              <button className="menu-button">Logo</button>
              <h1 className="page-title">{pageName}</h1>
              <button className="menu-button">Menu</button>
            </div>

            {/* Indicadores */}
            <div className="indicator-container">
              <h2 className="indicator-title">Indicators</h2>

              <div className="indicator-box">
                <p>1220 kWh</p>
                <p>$674.376</p>
                <p><strong>X</strong> was the most expensive month</p>
              </div>

              <div className="indicator-box">
                <p>1220 kWh</p>
                <p>$674.376</p>
                <p><strong>Y</strong> was the cheapest month</p>
              </div>

              <div className="indicator-box">
                <p>1220 kWh</p>
                <p>$674.376</p>
                <p><strong>W</strong> was the employee who consumed the most</p>
              </div>

              <div className="indicator-box">
                <p>1220 kWh</p>
                <p>$674.376</p>
                <p><strong>Z</strong> was the employee who consumed least</p>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="footer-buttons">
              <IonButton expand="full" routerLink="/tabs/tab1">Dashboard</IonButton>
              <IonButton expand="full" color="primary">Trend Overview</IonButton>
              <IonButton expand="full" routerLink="/tabs/tab3">Bonuses</IonButton>
            </div>
          </div>
        </IonContent>
      </CustomPage>
    </IonPage>
  );
};

export default IndicatorPage;
