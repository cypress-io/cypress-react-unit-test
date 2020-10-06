import tsConfig from "../../tsconfig.paths.json"; // Your top-level config!
import * as tsConfigPaths from  "tsconfig-paths";
 // atempt to make work absolute paths with cypress component testing 
 // did not work yet!!!
const baseUrl = "./";
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths
});