import { LabelProps } from '@/interface/label';

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label className="text-sm text-zinc-100" {...props}>
      {children}
    </label>
  );
};
