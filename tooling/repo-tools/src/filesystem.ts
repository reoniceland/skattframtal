import { dirname, join } from 'path'

/**
 * This function is used to resolve the absolute path of a package. It is needed
 * in projects that use Yarn PnP or are set up within a monorepo.
 * @param value The package name.
 * @returns The absolute path of the package.
 */
export function getAbsolutePath(value: string) {
  try {
    const packagePath = require.resolve(join(value, 'package.json'))
    return dirname(packagePath)
  } catch (error) {
    console.error(`Failed to resolve the path for: ${value}`, error)
    throw error
  }
}

export function getAbsoluteAssetsPath() {
  return join(getAbsolutePath('../../../packages/assets'), 'package.json')
}
