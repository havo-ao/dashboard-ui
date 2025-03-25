// Main Tabs
import Tab1 from "../../pages/Tab1";
import Tab2 from "../../pages/Tab2";
import Tab3 from "../../pages/Tab3";

// Side Menus
import { tab1SideMenu, tab2SideMenu, tab3SideMenu } from "../PageSideMenus";

// Main tab children
import Settings from "../../pages/Settings";

// Sub pages
import InboxItem from "../../pages/InboxItem";
import EnergyCostPage from "../../pages/EnergyCostPage";
import IndicatorPage from "../../pages/IndicatorPage"; // ✅ Corrección del nombre de importación

// Tab icons
import { flashOutline, trendingDown, giftOutline } from "ionicons/icons";

// Import custom tab menu
import TabMenu from "../TabMenu";
import SubRoutes from "./SubRoutes";

// Array de objetos representando las tabs principales en la app
export const tabRoutes = [
  {
    label: "Dashboard",
    component: Tab1,
    icon: flashOutline,
    path: "/tabs/tab1",
    default: true,
    isTab: true,
    sideMenu: true,
    sideMenuOptions: tab1SideMenu,
  },
  {
    label: "Trend Overview",
    component: Tab2,
    icon: trendingDown,
    path: "/tabs/tab2",
    default: false,
    isTab: true,
    sideMenu: true,
    sideMenuOptions: tab2SideMenu,
  },
  {
    label: "Bonuses",
    component: Tab3,
    icon: giftOutline,
    path: "/tabs/tab3",
    default: false,
    isTab: true,
    sideMenu: true,
    sideMenuOptions: tab3SideMenu,
  },
];

// Array de rutas hijas dentro de tabs principales
const tabChildrenRoutes = [
  { component: InboxItem, path: "/tabs/tab2/:id", isTab: false },
];

// Rutas para subpáginas que no pertenecen a un tab principal
const subPageRoutes = [
  { component: Settings, path: "/settings" },
  { component: EnergyCostPage, path: "/energy-cost" },
  { component: IndicatorPage, path: "/indicators" }, // ✅ Corrección del nombre
];

// Combinamos todas las rutas de tabs y sus hijos
const tabsAndChildrenRoutes = [...tabRoutes, ...tabChildrenRoutes];

// Renderizamos las subpáginas
export const SubPages = () => <SubRoutes routes={subPageRoutes} />;

// Renderizamos el menú de tabs
export const Tabs = () => <TabMenu tabs={tabsAndChildrenRoutes} position="bottom" />;
