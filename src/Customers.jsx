

import Layout from "./Layout";
import CustomerAside from "./Components/CustomerAside";
import CustomerMain from "./Components/CustomerMain";

const Customers = () => {
  return <Layout Aside={CustomerAside} Main={CustomerMain} />;
};

export default Customers;