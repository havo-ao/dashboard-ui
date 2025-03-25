import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent 
} from "@ionic/react";

import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from "recharts";

import TabMenu from "../main/TabMenu";  // Corrigiendo la ruta de importación
import { tabRoutes } from "../main/nav/AllRoutes";  // Corrigiendo la ruta de importación

// Datos de consumo de energía
const energyData = [
    { month: "Oct", consumption: 2200, cost: 2266000 },
    { month: "Nov", consumption: 2100, cost: 2163000 },
    { month: "Dec", consumption: 1900, cost: 1957000 },
    { month: "Jan", consumption: 1850, cost: 1905500 },
    { month: "Feb", consumption: 1800, cost: 1854000 },
    { month: "Mar", consumption: 1700, cost: 1751000 },
];

const EnergyCostPage = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Energy Cost Over Time</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="ion-padding">
                {/* Gráfica de consumo energético */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Last 6 Months Consumption (kWh)</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={energyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="consumption" stroke="#82ca9d" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </IonCardContent>
                </IonCard>

                {/* Gráfica de costo energético */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Last 6 Months Price of Invoices (COP)</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={energyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </IonCardContent>
                </IonCard>
            </IonContent>

            {/* Agregando el TabMenu en la parte inferior */}
            <TabMenu tabs={tabRoutes} position="bottom" />
        </IonPage>
    );
};

export default EnergyCostPage;
