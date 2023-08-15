import * as ReactIcon from 'ui';

interface UseCaseIconProps {
  iconName: string;
}

const UseCaseIcon: React.FC<UseCaseIconProps> = ({ iconName }) => {
  const isValidIcon = ReactIcon?.hasOwnProperty(iconName);
  const IconComponent = isValidIcon
    ? ReactIcon[iconName as keyof typeof ReactIcon]
    : null;

  return IconComponent ? (
    <IconComponent value="" className="h-8 w-8 text-muted-foreground" />
  ) : null;
};

export default UseCaseIcon;
