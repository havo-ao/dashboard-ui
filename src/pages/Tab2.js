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

// Importar JSON correctamente
import employeesData from "../api/energy_consumption_db.json"; 

const Tab2 = (props) => {
  const pageName = "Trend Overview";
  const setSideMenu = useSideMenuUpdate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]); // Estado para almacenar empleados
  const history = useHistory();

  useEffect(() => {
    if (props.location.pathname === "/tabs/tab2") {
      setSideMenu({ options: props.sideMenuOptions, side: "start", pageName });
    }
  }, [props.location, props.sideMenuOptions, setSideMenu]);

  // Cargar los empleados en el estado
  useEffect(() => {
    setEmployees(employeesData);
  }, []);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  // Filtrar empleados en base al término de búsqueda
  const filteredEmployees = employees.filter((employee) =>
    searchTerm.trim() === "" || employee.id.toLowerCase().includes(searchTerm.trim().toLowerCase())
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
                      <IonButton expand="full" className="custom-button" onClick={() => history.push("/indicators")}>
                        Indicators
                      </IonButton>
                    </IonCol>
                    <IonCol size="6">
                      <IonButton expand="full" className="custom-button" onClick={() => history.push("/energy-cost")}>
                        Energy Cost Over Time
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
                        placeholder="Buscar por ID"
                        value={searchTerm}
                        onIonInput={(e) => setSearchTerm(e.detail.value || "")}
                      />
                    </IonItem>
                    <IonList>
                      {filteredEmployees.map((employee, index) => (
                        <IonItem button key={index} onClick={() => handleEmployeeSelect(employee)}>
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
                    <IonCardTitle>Employee ID: {selectedEmployee.id}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText>
                      <p><strong>Floor:</strong> {selectedEmployee.floor}</p>
                      <p><strong>Lamp Consumption:</strong> {selectedEmployee.lamp_consumption} kWh</p>
                      <p><strong>PC Consumption:</strong> {selectedEmployee.pc_consumption} kWh</p>
                      <p><strong>Phone Consumption:</strong> {selectedEmployee.phone_consumption} kWh</p>
                    </IonText>
                    <IonRow>
                      <IonCol>
                        <IonButton expand="full" className="back-button" onClick={() => setSelectedEmployee(null)}>
                          Back
                        </IonButton>
                      </IonCol>
                    </IonRow>
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