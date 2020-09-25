// // Library Imports
// import React from "react";
//
// // Relative Imports
// import { Container, Wrapper } from "./styles";
// import { Information } from "../../../../assets/styles/type.js";
// import InputUpload from "../../_inputs/input_upload";
// import InputDownload from "../../_inputs/input_download";
//
// import demoFile from "../../../../assets/whitepapers/wp_english.png";
//
// const VaultFile = ({ value, onClick, onChange, action, keyStoreFile }) => {
//   return (
//     <Container>
//       <Wrapper>
//         {action === "upload" && (
//           <>
//             <InputUpload
//               label="Vault File"
//               value={keyStoreFile === "" ? "Select Vault File" : keyStoreFile}
//               button="Select"
//               type="file"
//               onChange={onChange}
//             />
//             <Information>
//               A Vault File is more secure then a Seed Phrase because it's an
//               encrypted file that requires a password. In addition, it prevents
//               your wallet from resyncing every login, providing a smoother
//               experience. If you don't have Vault File please restore a vault
//               with your seed to generate one.
//             </Information>
//           </>
//         )}
//         {action === "download" && (
//           <>
//             <InputDownload
//               label="Vault File"
//               placeholder="Vault File name"
//               value={demoFile}
//               button="Save"
//               action={action}
//             />
//             <Information>
//               This is your Vault File and it contains your private keys, seed
//               phrase, assets and is encrypted with your password. Using this
//               Vault File to login is safer and also prevents you from having to
//               resync your vault each time you login. Click the Save button and
//               store it on your device.
//             </Information>
//           </>
//         )}
//       </Wrapper>
//     </Container>
//   );
// };
//
// export default VaultFile;
