import * as BsIcon from "react-icons/bs";

const BootstrapIcon = ({ icon, size }) => {
  const Icon = BsIcon[icon];
  return <Icon size={size} />;
};
export default BootstrapIcon;
