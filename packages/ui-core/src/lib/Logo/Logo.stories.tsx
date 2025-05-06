import { Box } from '../Box/Box'
import { Logo } from './Logo'

export default {
  component: Logo,
}

export const Default = () => <Logo />

export const Solid = (args) => <Logo {...args} />

Solid.args = {
  width: 200,
  solid: true,
  solidColor: '#fff',
}

Solid.decorators = [
  (Story) => (
    <div
      style={{
        backgroundColor: '#000',
        padding: 20,
      }}
    >
      {Story()}
    </div>
  ),
]

export const IconOnly = (args) => <Logo {...args} />

IconOnly.args = {
  width: 30,
  iconOnly: true,
}

export const SolidIconOnly = (args) => (
  <Box background="dark400">
    <Logo {...args} />
  </Box>
)

SolidIconOnly.args = {
  width: 200,
  iconOnly: true,
  solid: true,
  solidColor: '#fff',
}
