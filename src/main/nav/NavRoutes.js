import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import SideMenu from "../SideMenu";
import { SubPages, Tabs, tabRoutes } from "./AllRoutes";

const NavRoutes = () => {
    return (
        <IonReactRouter>
            <IonSplitPane contentId="main">
                
                {/* Menú lateral */}
                <SideMenu />
                
                <IonRouterOutlet id="main">
                    {/* Rutas de las Tabs */}
                    <Route path="/tabs" render={() => <Tabs />} />

                    {/* Rutas de las SubPages */}
                    <SubPages />

                    {/* Página por defecto (redirige a la pestaña principal) */}
                    <Route 
                        path="/" 
                        component={tabRoutes.find(t => t.default)?.component} 
                        exact={true} 
                    />
                    <Redirect 
                        exact 
                        from="/" 
                        to={tabRoutes.find(t => t.default)?.path || "/tabs/tab1"} 
                    />
                </IonRouterOutlet>
            </IonSplitPane>
        </IonReactRouter>
    );
};

export default NavRoutes;
