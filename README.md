# SmartLading

# Revolutionizing the Maritime Documentation
<img width="830" alt="Screenshot 2024-11-17 at 02 47 01" src="https://github.com/user-attachments/assets/1b0d2888-1749-4d6e-aac6-60fc77ae59af">

SmartLading is an innovative blockchain-based platform designed to digitize and streamline the management of critical documents in maritime shipping, with a focus on the bill of lading document. 
The mission is to revolutionize maritime documentation by leveraging blockchain and AI technologies to provide secure, faster, cost-effective, and scalable solutions for the global shipping industry, an industry that handles over 90% of global trade by volume.

SmartLading is a platform providing  those key features :
- Digital transformation of maritime documentation
- Blockchain integration for enhanced security and transparency
- AI-powered operations
- Secure transactions
- Regulatory compliance

The platform aims to reduce processing time for bills of lading from 17 hours to just 14 minutes, representing a 120-fold improvement in efficiency.

# Main Key Features of the platform
## Digitalization of the Bill of Lading, powered by AI:
In order to ensure a smooth transition from paper-based to a digital version of the Bill of Lading, we provide to the users to digitize the document either by filling in a form manually or by using AI to extract automatically the needed fields from an image or a pdf version of it. 
Using AI allows faster operation and reduces the source of human error. The Claude.ai LLM has been used via API in order to extract data automaically from digital files (pdf, image)

Once this step is done, a hash is generate to authenticate the version of the bill of lading. This cryptographic operation allows the users to verify if a Bill of Lading is exisiting in their database and whether the filled attributes are compliant.

## Management of the Bill of Lading operations via a Dashboard:

From the dashboard, the user can have a visual access to the list of Bill of Lading :
- the user can see the latest info of the cargo shipments as well as have access to some operations on the bill of lading like transferring the ownership ar updating the status
- the user have also a map where he can locate the Cargo

<img width="211" alt="Screenshot 2024-11-17 at 02 46 53" src="https://github.com/user-attachments/assets/dd6f44d4-bf09-4ebc-83dc-1805e600bee6">
<img width="1433" alt="Screenshot 2024-11-17 at 02 57 16" src="https://github.com/user-attachments/assets/32922648-aec3-4836-9b27-8103d0aaa038">
<img width="1156" alt="Screenshot 2024-11-17 at 02 55 07" src="https://github.com/user-attachments/assets/d523285b-af04-41e0-afe8-06605bf5b9b5">
<img width="785" alt="Screenshot 2024-11-16 at 09 04 31" src="https://github.com/user-attachments/assets/733ba3b6-3beb-46a2-915d-19956897de41">
<img width="737" alt="Screenshot 2024-11-17 at 02 55 12" src="https://github.com/user-attachments/assets/2c58e42d-599c-4fa6-ae43-3d9a6a0e6cf3">

# Main Smart Contract functions :
Here are the main functions in the SmartLading smart contract. These functions provide the core functionality for managing bill of lading documents on the blockchain, including creation, verification, ownership transfer, and status updates.

# About the founder :
Ilham is the founder of SmartLading and CEO of DataChainEd, a Blockchain Consultancy Company. With over 10 years of experience as a software engineer and 6 years as a Team/Project Manager in an Agile and international environment, Ilham is passionate about Web3 technologies and believes in the potential of blockchain to transform businesses and provide secure and efficient products for enterprises.

The idea for SmartLading was born in April 2024 after meeting a client in the maritime transport sector who was seeking a blockchain solution for managing bills of lading. This sparked interest and research into the maritime transport domain and the digitalization of bills of lading.

Ilham believes in the power of blockchain to propel the maritime industry into a new era, and she's committed to contributing to this new dynamic through the SmartLading startup.

# Deployments 
## Linea Sepolia :

✅  [Success] Hash: 0xcf778f5eae31c1f08b639c3782c060aced1067fcbce1526ebdca98263a657df7
Contract Address: 0x39208e0d07181a2cF8b48e087B4573FF0bc03974
Block: 5923645
Paid: 0.00007004675421084 ETH (946968 gas * 0.073969505 gwei)

✅ Sequence #1 on linea-sepolia | Total Paid: 0.00007004675421084 ETH (946968 gas * avg 0.073969505 gwei)
                                                                                                                                    
Transaction : storeDocumentHash() 
https://sepolia.lineascan.build/address/0xca7f54d97a97ef80d46d021d4559b08726a7061c


## Zircuit Testnet 

✅ Deployed at (using remix) : 0xb08E2D65eD8609675E19284724ae87269039Cd5b 
Tx hash : 0xb4b113ab8948b24613e0d8fb8c9547b81e8facd21c01610c30ae7faa7f4ea845

https://explorer.testnet.zircuit.com/address/0xCA7f54D97a97eF80d46d021d4559B08726a7061c
https://explorer.testnet.zircuit.com/address/0xb08E2D65eD8609675E19284724ae87269039Cd5b

✅ Verified contract here : 
https://explorer.testnet.zircuit.com/address/0xb08E2D65eD8609675E19284724ae87269039Cd5b?activeTab=3


## Scroll Sepolia
✅  [Success] Hash: 0x776578f407132f58967bf1ea5abe4955e77b8d4aac4d9d401b9cc4a919ae62ce
Contract Address: 0xb08E2D65eD8609675E19284724ae87269039Cd5b
Block: 7306445
Paid: 0.02748762676698605 ETH (947230 gas * 29.018957135 gwei)

✅ Sequence #1 on scroll-sepolia | Total Paid: 0.02748762676698605 ETH (947230 gas * avg 29.018957135 gwei)

Transactions on the smart contract : https://sepolia.scrollscan.com/address/0xb08E2D65eD8609675E19284724ae87269039Cd5b

## Oasis Protocol - Sapphire 
✅  Please Refer to the branch for more details about the code changes : "smartLading_oasisProtocol"

✅  With the support of Oasis Protocol team, we succeeded in encrypting the on-chain transactions by wrapping provider + signer leveraging Sapphire library ( Metamask + Ethers v5) :

https://explorer.oasis.io/testnet/sapphire/address/0x14dC79964da2C08b23698B3D3cc7Ca32193d9955

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
