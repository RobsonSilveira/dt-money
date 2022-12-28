import * as Dialog from '@radix-ui/react-dialog';

import { NewTransactionButton, HeaderContainer, HeaderContent } from './styles';
import Logo from '../../assets/svg/logo.svg';
import { NewTransactionModal } from '../NewTransactionModal';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
