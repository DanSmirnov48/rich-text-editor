import React from "react";
import {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

const iconMapping: { [key: string]: React.ComponentType } = {
  "Heading 1": Heading1,
  "Heading 2": Heading2,
  "Heading 3": Heading3,
  "Heading 4": Heading4,
  "Heading 5": Heading5,
  "Heading 6": Heading6,
};

const DynamicHeadingIcon: React.FC<{ name: string }> = ({ name }) => {
  const IconComponent = iconMapping[name] || DefaultIcon;
  return <IconComponent />;
};

const DefaultIcon: React.FC = () => <Heading />;

export default DynamicHeadingIcon;