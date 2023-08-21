import DKG from "dkg.js";
import "./App.css";

const OT_NODE_HOSTNAME = "http://localhost";
const OT_NODE_PORT = "8900";
const PUBLIC_KEY = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_PORT,
  blockchain: {
    name: "hardhat",
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
  },
  maxNumberOfRetries: 30,
  frequency: 2,
  contentType: "all",
};

const DkgClient = new DKG(options);

function App() {
  async function fetchData() {
    const nodeInfo = await DkgClient.node.info();
    console.log(nodeInfo);

    const publicAssertion = {
      "@context": "https://schema.org",
      "@id": "https://tesla.modelX/2321",
      "@type": "Car",
      name: "Tesla Model X",
    };

    const result = await DkgClient.asset.create(
      {
        public: publicAssertion,
      },
      { epochsNum: 2 }
    );

    console.log(result.UAL);
  }

  return <div onClick={fetchData}>a</div>;
}

export default App;
