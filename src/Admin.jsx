import Layout from "./Layout";
import AdminAside from "./Components/AdminAside";
import AdminMain from "./Components/AdminMain";
import './Admin.css'

const Admin = () => {
  return (
    <Layout Aside={AdminAside} Main={AdminMain} />
  )
}

export default Admin;


