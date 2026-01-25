import Turnstile, { useTurnstile } from "react-turnstile";
import useVerifyTurnstileMutation from "../../hooks/mutations/useVerifyTurnstileMutation.ts";
import toast from "react-hot-toast";

type TurnstileWidgetProps = {
  setIsHuman: (isHuman: boolean) => void;
};

const TurnstileWidget = ({ setIsHuman }: TurnstileWidgetProps) => {
  const turnstile = useTurnstile();

  const { verifyTurnstile } = useVerifyTurnstileMutation(() => {
    turnstile.reset();
  });

  const verify = async (token: string) => {
    const result = await verifyTurnstile(token);
    setIsHuman(result.success);

    if (!result.success) {
      toast.error(result.errorCodes[0]);
    }
  };

  return <Turnstile sitekey="0x4AAAAAACQeIqQCaFOr7yJe" onVerify={verify} />;
};

export default TurnstileWidget;
