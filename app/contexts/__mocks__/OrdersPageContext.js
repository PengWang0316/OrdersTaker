import context from '../OrdersPageContextTestHelper';

const Context = ({
  Consumer: props => props.children(context)
});
export default Context;
