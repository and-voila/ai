import { Avatar, AvatarImage } from 'ui';

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="bg-primary p-1" src="/av-icon.png" />
    </Avatar>
  );
};
