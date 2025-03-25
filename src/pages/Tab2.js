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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonText,
  IonInput,
} from "@ionic/react";
import { personCircle, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import CustomPage from "../main/CustomPage";
import { useSideMenuUpdate } from "../main/SideMenuProvider";
import "./Tab2.css";

import employeesData from "../api/energy_consumption_db.json";

const Tab2 = (props) => {
  const pageName = "Trend Overview";
  const setSideMenu = useSideMenuUpdate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (props.location.pathname === "/tabs/tab2") {
      setSideMenu({ options: props.sideMenuOptions, side: "start", pageName });
    }
  }, [props.location, props.sideMenuOptions, setSideMenu]);

  const filteredEmployees = employeesData.filter(employee =>
    employee.id.includes(searchTerm)
  );

  return (
    <IonPage id={pageName}>
      <CustomPage name={pageName} sideMenu={true} sideMenuPosition="end">
        <IonGrid>
          <IonRow>  
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Historical Trend</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>
                    <IonCol size="6">
                      <IonButton expand="full" onClick={() => history.push("/indicators")}>
                        Indicators
                      </IonButton>
                    </IonCol>
                    <IonCol size="6">
                      <IonButton expand="full" onClick={() => history.push("/energy-cost")}>
                        Energy Cost
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
              {!selectedEmployee ? (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Employee Performance</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem>
                      <IonIcon icon={searchOutline} slot="start" />
                      <IonInput
                        placeholder="Search ID"
                        value={searchTerm}
                        onIonChange={e => setSearchTerm(e.detail.value || "")}
                      />
                    </IonItem>
                    <IonList>
                      {filteredEmployees.map(employee => (
                        <IonItem 
                          button 
                          key={employee.id}
                          onClick={() => setSelectedEmployee(employee)}>
                          <IonAvatar slot="start">
                            <IonIcon icon={personCircle} size="large" />
                          </IonAvatar>
                          <IonLabel>ID: {employee.id}</IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              ) : (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>ID: {selectedEmployee.id}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText>
                      <p>Floor: {selectedEmployee.floor}</p>
                      {Object.entries(selectedEmployee).map(([key, value]) => 
                        key.endsWith('_consumption') && (
                          <p key={key}>
                            <strong>{key.split('_')[0]}:</strong> {value} kWh
                          </p>
                        )
                      )}
                    </IonText>
                    <IonButton 
                      expand="full" 
                      onClick={() => setSelectedEmployee(null)}
                    >
                      Back
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </CustomPage>
    </IonPage>
  );
};

export default Tab2;