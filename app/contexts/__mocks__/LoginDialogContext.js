import context from '../LoginDialogContextTestHelper';

const Context = ({
  Consumer: props => props.children(context)
});
export default Context;
