import { Form } from 'react-bootstrap';

interface IControlProps {
  label: string;
  name: string;
  min: number;
  max: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Mode7Control: React.FC<IControlProps> = (props) => {
  return (
    <Form.Group controlId={`${props.name}-range`}>
      <Form.Label>{props.label}</Form.Label>
      <p id={`${props.name}-range-value`}>{props.value}</p>
      <Form.Control
        type="range"
        name={`${props.name}-range`}
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
    />
    </Form.Group>
  );
}

export default Mode7Control;