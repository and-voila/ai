interface OfficeProps {
  name: string;
  children: React.ReactNode;
  invert?: boolean;
}

function Office({ name, children, invert }: OfficeProps) {
  return (
    <address
      className={`text-base not-italic ${
        invert ? 'text-gray-100' : 'text-muted-foreground'
      }`}
    >
      <span
        className={`font-display text-base font-semibold ${
          invert ? 'text-gray-50' : 'text-foreground'
        }`}
      >
        {name}
      </span>
      <br />
      {children}
    </address>
  );
}

interface OfficesProps extends React.HTMLAttributes<HTMLUListElement> {
  invert?: boolean;
}

export function Offices({ invert, ...props }: OfficesProps) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Los Angeles" invert={invert}>
          And Voila AI, Inc.
          <br />
          1370 N. St. Andrews Place
          <br />
          Los Angeles, CA 90028
        </Office>
      </li>
      <li>
        <Office name="London" invert={invert}>
          And Voila CIC
          <br />
          Incorporating Soon
        </Office>
      </li>
    </ul>
  );
}
