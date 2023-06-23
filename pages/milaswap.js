import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Alert,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiCreditCard,
  FiSearch,
  FiBell,
  FiDroplet,
} from "react-icons/fi";
import MyChart from "../components/Mychart";
import { Line, Chart } from "react-chartjs-2";

import InchModal from "../components/InchModal";
import useInchDex from "../src/hooks/useInchDex";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { contractABI,contractAddress } from "./abi/utils/constant";
import { contractABI2,contractAddress2 } from "./abi/utils/constant";
import { contractABI3,contractAddress3 } from "./abi/utils/constant";
import { useContractRead } from 'wagmi'
import { useContractEvent } from 'wagmi'
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import {ownerAddress} from "./abi/utils/constant"
import { ethers } from "ethers";
import Web3 from 'web3';
import { disconnect } from '@wagmi/core'



export default function Dashboard() {





  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  const [userBalance, setUserBalance] = useState(null);

  const [userChain, setUserChain] = useState(null);
  const [userChainId, setUserChainId] = useState(null);
  const [userNetworkName, setUserNetworkName] = useState(null);

  const [data, setData] = useState(null);

  const [busdData, setBusdData] = useState(null);
  const [dripData, setDripData] = useState(null);
  const [busdBal, setBusdBal] = useState(null);
  const [busdWeiBalance, setBusdWeiBalance] = useState(null);
  const [dripBal, setDripBal] = useState(null);
  const [busdIsLoading, setBusdLoading] = useState(false);
  const [dripIsLoading, setDripLoading] = useState(false);
  
  const [usdtWeiBalance, setUsdtWeiBalance] = useState();

  const { trySwap, tokenList, getQuote, swapComplete } =
    useInchDex(userChainId);
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();

  const [fromTokenPriceUsd, setFromTokenPriceUsd] = useState();
  const [fromAmount, setFromAmount] = useState();
  const [toAmount, setToAmount] = useState();
  const [sellBnbFromAmount, setSellBnbFromAmount] = useState(0);
  const [buyBnbFromAmount, setBuyBnbFromAmount] = useState(0);
  const [sellBnbExpectedAmount, setSellBnbExpectedAmount] = useState(0);
  const [buyBnbExpectedAmount, setBuyBnbExpectedAmount] = useState(0);
  const [loadingSB, setLoadingSB] = useState(false);
  const [sellButtonDisabled, setSellButtonDisabled] = useState(true);
  const [buyButtonDisabled, setBuyButtonDisabled] = useState(true);

  const [sellBnbQuote, setSellBnbQuote] = useState({
    sbToTokenPrice: null,
    sbFromTokenPrice: null,
    sbQuoteGas: null,
    sbLoading: false,
  });

  const [quote, setQuote] = useState({
    toTokenPrice: null,
    quoteGas: null,
  });

  const [chrtState, setChrtState] = useState({
    loading: true,
    drip: null,
  });
  const [chartData, setChartData] = useState([]);
   const [chartData2, setChartData2] = useState([]);
   const [chartData3, setChartData3] = useState([]);
   const [employeeSalary, setEmployeeSalary] = useState([]);
   const [employeeAge, setEmployeeAge] = useState([]);

   //I want to hide the dex ui for now
   const [dexTuggle, setDexTuggle] = useState(false);

  // I want to set price loading or otherwise

   const [loadingUsdtPrice, setLoadingUsdtPrice] = useState(false);
  
   const [approveLoadingSell, setapproveLoadingSell] = useState(false);
   

  

   let chainId;
   let web3;

   const handleFromAmountChange = (event) => setFromAmount(event.target.value);

 const handleSellBnbFromAmountChange = (event) =>
     setSellBnbFromAmount(event.target.value);
   const handleBuyBnbFromAmountChange = (event) =>
    setBuyBnbFromAmount(event.target.value);

 














  const [supplyData, setSupplyData] = useState(0);
  const [milaBalance, setMilaBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [usdtData, setUsdtSupply] = useState(0);
  const [tokenId, setTokenId] = useState('0');
  const { address, connector, isConnected } = useAccount()

  const { data: totalMilaBalance, error: totalError } = useContractRead({
    address:contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
     })

  useEffect(() => {
    if (totalMilaBalance) {
      let bal = totalMilaBalance;
      setMilaBalance(bal);
    }
  }, [totalMilaBalance]);

  /* console.log data to view variables */
  // useEffect(() => {
   
  //   console.log("totalMilaBalance:", totalMilaBalance);
  // })

  const { data: milaTotalSupply, error: totalSupplyError } = useContractRead({
    address:contractAddress,
    abi: contractABI,
    functionName: "totalSupply",

  })

  useEffect(() => {
    if (milaTotalSupply) {
      let supply = milaTotalSupply;
      setSupplyData(supply);
    }
  }, [milaTotalSupply]);

  /* console.log data to view variables */
  // useEffect(() => {
   
  //   console.log("milaTotalSupply:", milaTotalSupply);
  // })

  const { data: milaData, error: milaDataError } = useContractRead({
    address:contractAddress2,
    abi: contractABI2,
    functionName: "sysVars",

  })


//  useEffect(() => {
   
//     console.log("milaData:", milaData[0]);
//   })


const { data: usdtTotalSupply, error: usdttotalSupplyError } = useContractRead({
  address:contractAddress3,
  abi: contractABI3,
  functionName: "totalSupply",
 

})

useEffect(() => {
  if (usdtTotalSupply) {
    let total = usdtTotalSupply;
    setUsdtSupply(total);
  }
}, [usdtTotalSupply]);

/* console.log data to view variables */
// useEffect(() => {
 
//   console.log("usdtTotalSupply:", usdtData.toString());
// })

const { data: totalUsdtBalance, error: usdtTotalError } = useContractRead({
  address:contractAddress3,
  abi: contractABI3,
  functionName: "balanceOf",
  
   })

useEffect(() => {
  if (totalUsdtBalance) {
    let bal2 = totalUsdtBalance;
    setUsdtBalance(bal2);
  }
}, [totalUsdtBalance]);


// useEffect(() => {
   
//     console.log("totalUsdtBalance:", usdtBalance);
//   })




const { config:milaApprove } = usePrepareContractWrite({
  address: contractAddress3,
  abi: contractABI3,
  functionName: 'approve',
  args:[address,weiValue(tokenId)]
})
const { data:approveData,  isSuccess, write:writeApprove } = useContractWrite(milaApprove)




const { config:milaBuy } = usePrepareContractWrite({
  address: contractAddress2,
  abi: contractABI2,
  functionName: 'buyMila',
  args:[weiValue(tokenId)],
})
const { data:buyData,  isSuccess:buySuccess, write:writeBuy } = useContractWrite(milaBuy)



//  useEffect(() => {
   
//     console.log("value:", tokenId);
//   })


 function ethValue(weiValue){
  return(
    ethers.utils.formatEther(weiValue)
  )
};










function weiValue(ethValue){
  return(
    ethers.utils.parseUnits(ethValue.toString(), 'ether').toString()
  )
};





  const{ connect, connectors, error, isLoading, pendingConnector } =
  useConnect()
 
const { disconnect } = useDisconnect()

if (isConnected) {

    return (
      <Flex id="milaswap"
        h={[null, null, "100vh"]}
        flexDir={["column", "column", "row"]}
        overflow="hidden"
        maxW="3000px"
      >
        <Flex
          w={["100%", "100%", "10%", "15%", "15%"]}
          flexDir="column"
          alignItems="center"
          backgroundColor="#001013"
          color="#B495B1"
        >
          <Flex
            flexDir="column"
            justifyContent="space-between"
            h={[null, null, "100vh"]}
          >
            <Flex flexDir="column" as="nav">
              <Heading
                mt={50}
                mb={[25, 50, 100]}
                fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
                alignSelf="center"
                letterSpacing="tight"
              >
                Mila.
              </Heading>
              <Flex
                flexDir={["row", "row", "column", "column", "column"]}
                align={[
                  "center",
                  "center",
                  "center",
                  "flex-start",
                  "flex-start",
                ]}
                justifyContent="center"
                mb={[0, 0, 6, 6, 6]}
              >
                <Flex
                  className="sidebar-items"
                  mr={[2, 6, 0, 0, 0]}
                  mb={[0, 0, 6, 6, 6]}
                >
                  <Link display={["none", "none", "flex", "flex", "flex"]}>
                    <Icon as={FiHome} fontSize="2xl" />
                  </Link>
                  <Link
                    _hover={{ textDecor: "none" }}
                    display={["flex", "flex", "none", "flex", "flex"]}
                  >
                    <Text>Home</Text>
                  </Link>
                </Flex>
                <Flex
                  className="sidebar-items"
                  mr={[2, 6, 0, 0, 0]}
                  mb={[0, 0, 6, 6, 6]}
                >
                  <Link display={["none", "none", "flex", "flex", "flex"]}>
                    <Icon
                      as={FiDroplet}
                      fontSize="2xl"
                      className="active-icon"
                    />
                  </Link>
                  <Link
                    _hover={{ textDecor: "none" }}
                    display={["flex", "flex", "none", "flex", "flex"]}
                  >
                    <Text className="active">Dashboard </Text>
                  </Link>
                </Flex>
                <Flex
                  className="sidebar-items"
                  mr={[2, 6, 0, 0, 0]}
                  mb={[0, 0, 6, 6, 6]}
                >
                  <Link display={["none", "none", "flex", "flex", "flex"]}>
                    <Icon as={FiPieChart} fontSize="2xl" />
                  </Link>
                  <Link
                    _hover={{ textDecor: "none" }}
                    display={["flex", "flex", "none", "flex", "flex"]}
                  >
                    <Text>Wallet</Text>
                  </Link>
                </Flex>
                <Flex
                  className="sidebar-items"
                  mr={[2, 6, 0, 0, 0]}
                  mb={[0, 0, 6, 6, 6]}
                >
                  <Link display={["none", "none", "flex", "flex", "flex"]}>
                    <Icon as={FiBox} fontSize="2xl" />
                  </Link>
                  <Link
                    _hover={{ textDecor: "none" }}
                    display={["flex", "flex", "none", "flex", "flex"]}
                  >
                    <Text>Services</Text>
                  </Link>

                  <Link
                    _hover={{ textDecor: "none" }}
                    display={["flex", "flex", "none", "flex", "flex"]}
                  >
                    
                  </Link>
                </Flex>
                {address==address&&(
                <Flex
                  className="sidebar-items"
                  mr={[2, 6, 0, 0, 0]}
                  mb={[0, 0, 6, 6, 6]}
                >
                  <Link href="/admin/#Admin" >
                    <Icon as={FiBox} fontSize="2xl" display={["none", "none", "flex", "flex", "flex"]}/>
                    
                  </Link> 
                  <Link href="/admin/#Admin"    _hover={{ textDecor: "none" }}
                    display={["flex", "flex", "none", "flex", "flex"]} >
                 <Text>Admin</Text>
</Link>
                </Flex>)}
              </Flex>
            </Flex>


           
            <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
              <Avatar my={2} src="avatar-1.jpg" />
              <Text textAlign="center">Ola Silva A.</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* column2 */}

        {/* column3 */}
        <Flex flexDir="column" w={["100%", "100%", "100%","100","100"]}>
          <Flex
            w={["100%", "100%", "100%"]}
            minW={[null, null, "300px", "300px", "400px"]}
            bgColor="#F5F5F5"
            p="3%"
            flexDir="column"
            // overflow="auto"
            align="center"
          >
            <Flex alignContent="center">
              {/* <Button
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                id="button-connect-wallet"
                borderRadius="3xl"
                border="1px"
                w="100%"
                borderColor="gray.200"
                py="6"
                fontSize="sm"
                letterSpacing="wide"
                fontWeight="bold"
                onClick={() => disconnect()}
              >
                {defaultAccount}
              </Button> */}


                
              <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div id="button-connect-wallet"
style={{  alignItems:"center",alignContent:"center", width:"450px",border:"1px",height:"70px", fontSize:"18px",borderRadius:"40px", padding:"0.7rem",textAlign:"center" }} 
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                display: 'flex', alignItems: 'center'
                            
              },
            })}
          >
          { (() => {
              
            if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" style={{fontWeight:700, alignContent:"center",textAlign:"center",alignItems:"center",width:"100%" }} >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
               
                return (
                  <button onClick={openChainModal} type="button" style={{fontWeight:700, alignContent:"center",textAlign:"center",alignItems:"center",width:"100%" }}>
                    Wrong network
                  </button>
                
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button" style={{fontWeight:500, alignContent:"center",textAlign:"center",alignItems:"center",width:"70%" }}>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom> 

                        









            </Flex>
          </Flex>

          <Flex
            w={["100%", "100%", "100%"]}
            minW={[null, null, "300px", "300px", "1200px"]}
            bgColor="#F5F5F5"
            p="3%"
            flexDir="column"
            overflow="auto"
            align="center"
          >
            <Flex
              w={["100%", "100%", "100%","100%","100%"]}
              minW={[null, null, "300px", "300px", "900px"]}
            >
              <Flex
                w={["100%", "100%", "100%"]}
                minW={[null, null, "300px", "300px", "400px"]}
                bgColor="#F5F5F5"
                p="3%"
                flexDir="column"
              >
                <Flex alignContent="center">
                  <Heading letterSpacing="tight" mt="5">
                    Wallet
                  </Heading>
                </Flex>
                {value == 1 && (
                  <Box
                    borderRadius="25px"
                    mt={4}
                    w="100%"
                    h="200px"
                    bgGradient="linear(to-t, #B57295, #29259A)"
                    boxShadow="md"
                  >
                    <Flex
                      p="1em"
                      color="#fff"
                      flexDir="column"
                      h="100%"
                      justify="space-between"
                    >
                      <Flex justify="space-between" w="100%" align="flex-start">
                        <Flex flexDir="column">
                          <Text color="gray.400">
                            Current Balance :
                          
                          </Text>
                          {ethValue( milaBalance.toString())+ " MILA"}
                          
                        </Flex>
                        <Flex align="center">
                          <Icon mr={2} as={FiCreditCard} />
                          <Text color="#D8ABD8">MILALA TOKEN</Text>
                        </Flex>
                      </Flex>
                   
                      <Flex align="flex-end" justify="space-between">
                        <Flex>
                          <Flex flexDir="column" mr={4}>
                            <Text
                              textTransform="uppercase"
                              color="#D8ABD8"
                              fontSize="xs"
                            >
                             Total Supply :
                            </Text>
                           <Text fontSize="sm"> {ethValue(supplyData.toString())}</Text>
                          </Flex>
                          
                        </Flex>
                        
                      </Flex>
                     
                      <Text  color="#D8ABD8" >milaToken Address : </Text>
                      <Text fontSize="sm">{milaData[0]}</Text>
                     
                    
                     
                    </Flex>
                  </Box>
                )}
                {value == 2 && (
                  <Box
                    borderRadius="25px"
                    mt={4}
                    w="100%"
                    h="200px"
                    bgGradient="linear(to-t, #1f306e, #f5487f)"
                  >
                    <Flex
                      p="1em"
                      color="#fff"
                      flexDir="column"
                      h="100%"
                      justify="space-between"
                    >
                      <Flex justify="space-between" w="100%" align="flex-start">
                        <Flex flexDir="column">
                          <Text color="#CDFFF9" fontSize="sm">Current USDT Balance: </Text>
                          <Text  >
                          {ethValue(usdtBalance)}$
                          </Text>
                        </Flex>
                        <Flex align="center">
                          <Icon mr={2} as={FiCreditCard} />
                          <Text fontSize="sm">MILAUSDT TOKEN.</Text>
                        </Flex>
                      </Flex>
                    <Text fontSize="xs" color="#CDFFF9"  mt="3" textTransform="uppercase">
                      Total Supply:
                    </Text>
                      <Text mb={4} fontSize="sm">
                      {ethValue(usdtData.toString())}
                      </Text>
                      <Flex align="flex-end" justify="space-between">
                        <Flex>
                          <Flex flexDir="column" mr={4}>
                            <Text
                              mb={3}
                              color="#CDFFF9"
                             
                            >
                             MilaUsdt Address:
                            </Text>
                            <Text fontSize="sm" >
                              {milaData[1]}
                            </Text>
                          </Flex>
                          <Flex flexDir="column">
                            <Text
                              textTransform="uppercase"
                              fontSize="xs"
                              color="#CDFFF9"
                            >
                              
                            </Text>
                          
                          </Flex>
                        </Flex>
                       
                      </Flex>
                    </Flex>
                  </Box>
                )}

                {value == 3 && (
                  <Box
                    borderRadius="25px"
                    mt={4}
                    w="100%"
                    h="200px"
                    bgGradient="linear(to-t, orange.300, pink.600)"
                  >
                    <Flex
                      p="1em"
                      color="#fff"
                      flexDir="column"
                      h="100%"
                      justify="space-between"
                    >
                      <Flex justify="space-between" w="100%" align="flex-start">
                        <Flex flexDir="column">
                          <Text color="gray.400">MilaPrice: </Text>
                          <Text fontWeight="bold" fontSize="xl">
                           
                          </Text>
                          {ethValue(milaData[3].toString())}
                        </Flex>
                        <Flex align="center">
                          <Icon mr={2} as={FiCreditCard} />
                          <Text>Mila.</Text>
                        </Flex>
                      </Flex>
                      <Text mb={4}>
                        
                      </Text>
                      <Flex align="flex-end" justify="space-between">
                        <Flex>
                          
                         
                        </Flex>
                     
                      </Flex>
                          <Text textTransform="uppercase" fontSize="xs">
                             milaToken Fee:
                            
                            </Text>
                       {ethValue(milaData[4].toString())}
                    </Flex>
                    
                  </Box>
                )}
                <Flex justifyContent="center" mt={2}>
                  <Button
                    bgColor={value == 1 ? "gray.600" : "gray.400"}
                    onClick={() => changeValue(1)}
                    size="xs"
                    mx={1}
                  />
                  <Button
                    bgColor={value == 2 ? "gray.600" : "gray.400"}
                    onClick={() => changeValue(2)}
                    size="xs"
                    mx={1}
                  />
                  <Button
                    bgColor={value == 3 ? "gray.600" : "gray.400"}
                    onClick={() => changeValue(3)}
                    size="xs"
                    mx={1}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex
              w={["100%", "100%", "100%"]}
              minW={[null, null, "300px", "300px", "900px"]}
              bgColor="#F5F5F5"
              p="3%"
              flexDir={["column", "column", "row"]}
              justifyContent="space-between"
            >
              <Flex
                borderRadius="3xl"
                border="0px"
                borderColor="gray.200"
                minW={[null, null, "300px", "300px", "400px"]}
                flexDir="column"
              >
                <Box
                  bg="#ffffff"
                  p={4}
                  mt={8}
                  borderRadius="20px"
                  border="0px"
                  borderColor="#dc35464b"
                  boxShadow="xl"
                  color="gray.700"
                >
                  <Flex flexDir="column">
                    <Flex flexDir="row" justifyContent="space-between">
                      <Flex flexDir="column">
                        <Text fontWeight="medium">Sell MILA</Text>
                        <Text
                          fontWeight="medium"
                          fontSize={"x-small"}
                          color="#9E6596"
                        >
                          Get USDT
                        </Text>
                      </Flex>

                      <Flex flexDir="row" align="center">
                        <Flex flexDir="column">
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            mx="2"
                            align="end"
                            color="gray.500"
                          >
                            WBNB Bal:
                          </Text>
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            mx="2"
                            align="end"
                          >
                            {loadingUsdtPrice ? "Loading" : userBalance}
                          </Text>
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            mx="2"
                            align="end"
                          >
                            {/* {loadingPrice? "Loading": "$"+tokenBalance} */}
                          </Text>
                        </Flex>
                        <Button
                          borderRadius="20px"
                          w="auto"
                          boxShadow="xl"
                          variant="outline"
                          fontSize="sm"
                          onClick={() => {
                            setSellBnbFromAmount(userBalance);
                          }}
                        >
                          max
                        </Button>
                      </Flex>
                    </Flex>

                    <Flex
                      flexDir="row"
                      p={6}
                      mt={4}
                      borderRadius="20px"
                      bgColor="gray.200"
                      align="center"
                      justify="space-between"
                    >
                      <Input
                        placeholder="0.0"
                        w="100%"
                        _hover={{
                          border: "0px",
                        }}
                        onChange={handleSellBnbFromAmountChange}
                        // value={fromAmount}
                        value={sellBnbFromAmount ? sellBnbFromAmount : ""}
                      />
                    </Flex>
                    <Flex flexDir="row" justifyContent="flex-end">
                      <Text fontSize="xs" fontWeight="bold">
                        {fromTokenPriceUsd}
                      </Text>
                    </Flex>

                    <Flex align="center" mt={3}>
                      <Divider />

                      <Divider />
                    </Flex>

                    <Flex
                      flexDir="column"
                      justifyContent="flex-end"
                      align={"flex-end"}
                    >
                      <Text fontSize="xs" fontWeight="bold">
                        BUSD Balance:{" "}
                      </Text>
                      <Text fontSize="xs" fontWeight="bold">
                        {busdBal}
                      </Text>
                      {/* <Text fontSize="xs" fontWeight="bold" >{usdtBalance}</Text> */}
                    </Flex>
                    <Flex flexDir="row" w={"100%"} justifyContent="flex-end">
                      <Button
                        w={"50%"}
                        py={5}
                        borderRadius="15px"
                        bgColor="#dc35464b"
                        isDisabled={sellButtonDisabled == true}
                        mt={5}
                        onClick={() => swapBnbForUsdt()}
                        isLoading={approveLoadingSell}
                        // disabled
                      >
                        Sell WBNB
                      </Button>
                    </Flex>
                  </Flex>
                  <Flex></Flex>
                </Box>
                <Box align={"center"}>
                  <Skeleton isLoaded={!loadingSB}>
                    <Flex
                      bg="#f9f9f9"
                      p={4}
                      borderRadius="20px"
                      borderTopRadius="0px"
                      w={"90%"}
                      border="0px"
                      borderColor="#dc35464b"
                      boxShadow="xl"
                      color="gray.700"
                      justifyContent={"space-between"}
                    >
                      <Flex
                        flexDir="row"
                        justifyContent={"space-between"}
                        w={"100%"}
                      >
                        <Flex
                          flexDir="column"
                          justifyContent="flex-start"
                          align={"flex-start"}
                        >
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.500"
                          >
                            Spend BNB:{" "}
                          </Text>
                          <Text fontSize="xs" fontWeight="bold">
                            {sellBnbFromAmount}
                          </Text>
                          {/* <Text fontSize="xs" fontWeight="bold" >{usdtBalance}</Text> */}
                        </Flex>
                        <Flex
                          flexDir="column"
                          justifyContent="flex-end"
                          align={"flex-end"}
                        >
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.500"
                          >
                            Get USDT:{" "}
                          </Text>
                          <Text fontSize="xs" fontWeight="bold">
                            ~{sellBnbExpectedAmount}
                          </Text>
                          {/* <Text fontSize="xs" fontWeight="bold" >{usdtBalance}</Text> */}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Skeleton>
                </Box>
              </Flex>
              <Flex
                minW={[null, null, "300px", "300px", "400px"]}
                flexDir="column"
              >
                <Box
                  bg="#ffffff"
                  p={4}
                  mt={8}
                  borderRadius="20px"
                  border="0px"
                  borderColor="#dc35464b"
                  boxShadow="xl"
                  color="gray.700"
                >
                  <Flex flexDir="column">
                    <Flex flexDir="row" justifyContent="space-between">
                      <Flex flexDir="column">
                        <Text fontWeight="medium">Buy MILA</Text>
                        <Text
                          fontWeight="medium"
                          fontSize={"x-small"}
                          color="#9E6596"
                        >
                          sell USDT
                        </Text>
                      </Flex>
                      <Flex flexDir="row" align="center">
                        <Flex flexDir="column">
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            mx="2"
                            align="end"
                            color="gray.500"
                          >
                            USDT Bal:
                          </Text>
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            mx="2"
                            align="end"
                          >
                            {loadingUsdtPrice ? "Loading" : ethValue(usdtBalance.toString())}{" "}$
                          </Text>
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            mx="2"
                            align="end"
                          >
                            {/* {loadingPrice? "Loading": "$"+tokenBalance} */}
                          </Text>
                        </Flex>
                        <Button
                          borderRadius="20px"
                          w="auto"
                          boxShadow="xl"
                          variant="outline"
                          fontSize="sm"
                          onClick={() => {
                            setBuyBnbFromAmount(busdBal);
                          }}
                        >
                          max
                        </Button>
                      </Flex>
                    </Flex>

                    <Flex
                      flexDir="row"
                      p={6}
                      mt={4}
                      borderRadius="20px"
                      bgColor="gray.200"
                      align="center"
                      justify="space-between"
                    >
                      <Input
                        placeholder="0.0"
                        w="100%"
                        _hover={{
                          border: "0px",
                        }}
                        onChange={(e) => setTokenId(e.target.value)}
                        // value={fromAmount}
                        // value={toAmount? toAmount:""}
                        value={tokenId}
                      />
                    </Flex>
                    <Flex flexDir="row" justifyContent="flex-end">
                      <Text fontSize="xs" fontWeight="bold">
                    
                      </Text>
                    </Flex>

                    <Flex align="center" mt={3}>
                      <Divider />

                      <Divider />
                    </Flex>

                    <Flex
                      flexDir="column"
                      justifyContent="flex-end"
                      align={"flex-end"}
                    >
                      <Text fontSize="xs" fontWeight="bold">
                        Mila Bal:{" "}
                      </Text>
                      <Text fontSize="xs" fontWeight="bold">
                        {ethValue(milaBalance.toString())}{" "}MILA
                      </Text>
                      {/* <Text fontSize="xs" fontWeight="bold" >{usdtBalance}</Text> */}
                    </Flex>
                    <Flex flexDir="row" w={"100%"} justifyContent="flex-end">
                      {/* <Button
                                    w={"50%"}
                                    py={5}
                                    borderRadius="15px"
                                    bgColor="#dc35464b"
                                    isDisabled={enableBuyButton == true}
                                    mt={5}
                                    // onClick={() => trySwap(currentTrade)}
                                    onClick={() => approvebutton()}
                                    // rightIcon={<ArrowForwardIcon />} 
                                    mr={10}
                                    isLoading={approveLoading} 
                            >Approve</Button> */}
                      <Button
                        w={"50%"}
                        py={5}
                        borderRadius="15px"
                        bgColor="#dc35464b"
                        isDisabled={isSuccess}
                        mt={5}
                        onClick={()=>{
                          try{
                            writeApprove?.();
                            writeBuy?.();
                      
                          }
                          catch(err){
                            console.log(err);
                          }
                        }}
                       
                      >
                        Buy MILA
                      </Button>
                    </Flex>
                  </Flex>
                  <Flex></Flex>
                </Box>
                <Box align={"center"}>
                  <Skeleton isLoaded={!loadingSB}>
                    <Flex
                      bg="#f9f9f9"
                      p={4}
                      borderRadius="20px"
                      borderTopRadius="0px"
                      w={"90%"}
                      border="0px"
                      borderColor="#dc35464b"
                      boxShadow="xl"
                      color="gray.700"
                      justifyContent={"space-between"}
                    >
                      <Flex
                        flexDir="row"
                        justifyContent={"space-between"}
                        w={"100%"}
                      >
                        <Flex
                          flexDir="column"
                          justifyContent="flex-start"
                          align={"flex-start"}
                        >
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.500"
                          >
                            Spend BUSD:{" "}
                          </Text>
                          <Text fontSize="xs" fontWeight="bold">
                            {buyBnbFromAmount}
                          </Text>
                          {/* <Text fontSize="xs" fontWeight="bold" >{usdtBalance}</Text> */}
                        </Flex>
                        <Flex
                          flexDir="column"
                          justifyContent="flex-end"
                          align={"flex-end"}
                        >
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.500"
                          >
                            Get BNB:{" "}
                          </Text>
                          <Text fontSize="xs" fontWeight="bold">
                            ~{buyBnbExpectedAmount}
                          </Text>
                          {/* <Text fontSize="xs" fontWeight="bold" >{usdtBalance}</Text> */}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Skeleton>
                </Box>
              </Flex>
              {dexTuggle && swap == "fromto" && (
                <Box
                  bg="#ffffff"
                  p={4}
                  mt={8}
                  borderRadius="20px"
                  border="0px"
                  borderColor="#dc35464b"
                  boxShadow="xl"
                  color="gray.700"
                >
                  <Flex flexDir="column">
                    <Flex flexDir="row" justifyContent="space-between">
                      <Text fontWeight="medium">Swap2</Text>

                      <Flex flexDir="row" align="center">
                        <Flex flexDir="column">
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            mx="2"
                            align="end"
                          >
                            walletTokenBalance
                          </Text>
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            mx="2"
                            align="end"
                          >
                            tokenBalance
                          </Text>
                        </Flex>
                        <Button
                          borderRadius="20px"
                          w="auto"
                          boxShadow="xl"
                          variant="outline"
                          fontSize="sm"
                        >
                          max
                        </Button>
                      </Flex>
                    </Flex>

                    <Flex
                      flexDir="row"
                      p={6}
                      mt={4}
                      borderRadius="20px"
                      bgColor="gray.200"
                      align="center"
                      justify="space-between"
                    >
                      <Input
                        placeholder="0.0"
                        w="50%"
                        _hover={{
                          border: "0px",
                        }}
                        // onChange={handleFromAmountChange}
                        // value={fromAmount}
                        // value={fromAmount? fromAmount:0}
                      />

                      <Button
                        borderRadius="20px"
                        w="auto"
                        boxShadow="xl"
                        fontSize="sm"
                        onClick={() => setFromModalActive(true)}
                      >
                        {/* <Icon as={FiDroplet} mx={3} /> */}
                        {fromToken ? (
                          <img
                            src={
                              fromToken?.logoURI ||
                              "https://etherscan.io/images/main/empty-token.png"
                            }
                            alt="nologo"
                            width="30px"
                            preview={false}
                            style={{
                              borderRadius: "15px",
                              paddingRight: "5px",
                            }}
                          />
                        ) : (
                          <span>Select a token</span>
                        )}
                        <span pl="5px"> {fromToken?.symbol}</span>
                        <Icon as={FiChevronDown} mx={3} />
                      </Button>
                    </Flex>
                    <Flex flexDir="row" justifyContent="flex-end">
                      <Text fontSize="xs" fontWeight="bold">
                        fromTokenPriceUsd
                      </Text>
                    </Flex>

                    <Flex align="center" mt={3}>
                      <Divider />
                      <IconButton
                        icon={
                          <>
                            <FiChevronUp /> <FiChevronDown />
                          </>
                        }
                        onClick={() => {
                          if (swap == "fromto") {
                            swapChange("tofrom");
                          } else {
                            swapChange("fromto");
                          }
                        }}
                      />

                      {/* <IconButton
                                    icon={display === 'show' ? <FiChevronUp /> : <FiChevronDown />}
                                    onClick={() => {
                                        if (display == 'show') {
                                            changeDisplay('none')
                                        } else {
                                            changeDisplay('show')
                                        }
                                    }

                                    } /> */}
                      <Divider />
                    </Flex>

                    <Flex
                      flexDir="row"
                      p={6}
                      mt={3}
                      borderRadius="20px"
                      bgColor="gray.200"
                      align="center"
                      justify="space-between"
                    >
                      <Input
                        placeholder="0.0"
                        w="50%"
                        _hover={{
                          border: "0px",
                        }}
                        // value={quote ? Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals).toFixed(6) : ""}
                      />

                      <Button
                        borderRadius="20px"
                        boxShadow="xl"
                        w="auto"
                        fontSize="sm"
                        onClick={() => setToModalActive(true)}
                      >
                        <span> toToken?.symbol</span>
                        <Icon as={FiChevronDown} mx={2} />
                      </Button>
                    </Flex>
                    <Flex flexDir="row" justifyContent="flex-end">
                      <Text fontSize="xs" fontWeight="bold">
                        toTokenPriceUsd
                      </Text>
                    </Flex>

                    <Button
                      py={5}
                      borderRadius="15px"
                      bgColor="#dc35464b"
                      // isDisabled={buttonEnable}
                      mt={5}
                      // onClick={() => trySwap(currentTrade)}
                    >
                      Swap
                    </Button>
                  </Flex>
                  <Flex></Flex>
                </Box>
              )}
              {dexTuggle && swap === "tofrom" && (
                <Box
                  bg="#ffffff"
                  p={4}
                  mt={8}
                  borderRadius="20px"
                  border="0px"
                  borderColor="#dc35464b"
                  boxShadow="xl"
                >
                  <Flex flexDir="column">
                    <Text fontWeight="medium">Swap</Text>
                    <Flex
                      flexDir="row"
                      p={6}
                      mt={4}
                      borderRadius="20px"
                      bgColor="gray.200"
                      align="center"
                      justify="space-between"
                    >
                      <Input
                        placeholder="0.0"
                        w="50%"
                        _hover={{
                          border: "0px",
                        }}
                      />

                      <Button
                        borderRadius="20px"
                        w="auto"
                        boxShadow="xl"
                        fontSize="sm"
                        onClick={() => setToModalActive(true)}
                      >
                        {/* <Icon as={FiDroplet} mx={3} /> */}
                        {toToken ? (
                          <img
                            src={
                              toToken?.logoURI ||
                              "https://etherscan.io/images/main/empty-token.png"
                            }
                            alt="nologo"
                            width="30px"
                            preview={false}
                            style={{
                              borderRadius: "15px",
                              paddingRight: "5px",
                            }}
                          />
                        ) : (
                          <span>Select a token</span>
                        )}
                        <span pl="5px"> toToken?.symbol</span>
                        <Icon as={FiChevronDown} mx={3} />
                      </Button>
                    </Flex>
                    <Flex align="center" mt={3}>
                      <Divider />
                      <IconButton
                        icon={
                          <>
                            <FiChevronUp /> <FiChevronDown />
                          </>
                        }
                        onClick={() => {
                          if (swap == "fromto") {
                            swapChange("tofrom");
                          } else {
                            swapChange("fromto");
                          }
                        }}
                      />

                      {/* <IconButton
                                    icon={display === 'show' ? <FiChevronUp /> : <FiChevronDown />}
                                    onClick={() => {
                                        if (display == 'show') {
                                            changeDisplay('none')
                                        } else {
                                            changeDisplay('show')
                                        }
                                    }

                                    } /> */}
                      <Divider />
                    </Flex>

                    <Flex
                      flexDir="row"
                      p={6}
                      mt={3}
                      borderRadius="20px"
                      bgColor="gray.200"
                      align="center"
                      justify="space-between"
                    >
                      <Input
                        placeholder="0.0"
                        w="50%"
                        _hover={{
                          border: "0px",
                        }}
                      />

                      <Button
                        borderRadius="20px"
                        boxShadow="xl"
                        w="auto"
                        fontSize="sm"
                        onClick={() => setFromModalActive(true)}
                      >
                        {fromToken ? (
                          <img
                            src={
                              fromToken?.logoURI ||
                              "https://etherscan.io/images/main/empty-token.png"
                            }
                            alt="nologo"
                            width="30px"
                            preview={false}
                            style={{
                              borderRadius: "15px",
                              paddingRight: "5px",
                            }}
                          />
                        ) : (
                          <span>Select a token</span>
                        )}
                        <span> {fromToken?.symbol}</span>
                        <Icon as={FiChevronDown} mx={2} />
                      </Button>
                    </Flex>
                    <Button
                      py={5}
                      borderRadius="15px"
                      bgColor="#dc35464b"
                      mt={5}
                    >
                      Swap
                    </Button>
                  </Flex>
                  <Flex></Flex>
                </Box>
              )}
            </Flex>
          </Flex>
        </Flex>

        <InchModal
          open={isFromModalActive}
          onClose={() => setFromModalActive(false)}
          setToken={setFromToken}
          tokenList={tokenList}
        />

        <InchModal
          open={isToModalActive}
          onClose={() => setToModalActive(false)}
          setToken={setToToken}
          tokenList={tokenList}
        />
      </Flex>
   
    );
    
  }
  if(!isConnected){
  return (
    <Flex
      h={[null, null, "100vh"]}
      flexDir={["column", "column", "row"]}
      overflow="hidden"
      maxW="2000px"
    >
      <Flex
        w={["100%", "100%", "10%", "15%", "15%"]}
        flexDir="column"
        alignItems="center"
        backgroundColor="#001013"
        color="#B495B1"
      >
        <Flex
          flexDir="column"
          justifyContent="space-between"
          h={[null, null, "100vh"]}
        >
          <Flex flexDir="column" as="nav">
            <Heading
              mt={50}
              mb={[25, 50, 100]}
              fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
              alignSelf="center"
              letterSpacing="tight"
            >
              Mila.
            </Heading>
            <Flex
              flexDir={["row", "row", "column", "column", "column"]}
              align={["center", "center", "center", "flex-start", "flex-start"]}
              justifyContent="center"
              mb={[0, 0, 6, 6, 6]}
            >
              <Flex
                className="sidebar-items"
                mr={[2, 6, 0, 0, 0]}
                mb={[0, 0, 6, 6, 6]}
              >
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiHome} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text>Home</Text>
                </Link>
              </Flex>
              <Flex
                className="sidebar-items"
                mr={[2, 6, 0, 0, 0]}
                mb={[0, 0, 6, 6, 6]}
              >
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiDroplet} fontSize="2xl" className="active-icon" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text className="active">Dashboard</Text>
                </Link>
              </Flex>
              <Flex
                className="sidebar-items"
                mr={[2, 6, 0, 0, 0]}
                mb={[0, 0, 6, 6, 6]}
              >
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiPieChart} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text>Wallet</Text>
                </Link>
              </Flex>
              <Flex
                className="sidebar-items"
                mr={[2, 6, 0, 0, 0]}
                mb={[0, 0, 6, 6, 6]}
              >
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiBox} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text>Services</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Avatar my={2} src="avatar-1.jpg" />
            <Text textAlign="center">Ola Silva A.</Text>
          </Flex>
        </Flex>
      </Flex>
      {/* column 2 */}
      <Flex
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Heading fontWeight="normal">
          Milala,{" "}
          <Flex fontWeight="bold" display="inline-flex">
            Blockchain.
          </Flex>
        </Heading>
        <Text color="gray" fontSize="sm">
          Invest in African Businesses from anywhere
        </Text>
        <Text fontWeight="bold" fontSize="2xl">
          Connect Wallet
        </Text>
        <Flex justifyContent="space-between" mt={8} align="center">
          <Text fontSize="sm" color="gray.700" fontWeight="bold">
            Drip/USDT: ${chrtState.drip}
          </Text>
          <Button
            borderRadius="20px"
            w="auto"
            boxShadow="xl"
            variant="outline"
            fontSize="x-small"
            mr={0}
          >
            24hr
          </Button>
        </Flex>
        <MyChart />
        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="Tight">
              Transactions
            </Heading>
            <Text fontSize="sm" color="gray" ml={4}>
              Apr 2021
            </Text>
          </Flex>
          <IconButton icon={<FiCalendar />} />
        </Flex>
        <Flex flexDir="column" fontSize="smaller">
          <Flex overflow="auto">
            <Table variant="unstyled" mt={4}>
              <Thead>
                <Tr color="gray">
                  <Th> Name of Transation</Th>
                  <Th> Category</Th>
                  <Th isNumeric> Cashback</Th>
                  <Th isNumeric> Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* {bscScanData?.map((trans) => ( */}
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="avatar-1.jpg" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          Amazon3
                        </Heading>
                        {/* <Text fontSize="sm" color="gray" noOfLines={1}>{trans.blockhash}</Text> */}
                      </Flex>
                    </Flex>
                  </Td>
                  <Td> Electronic Devices </Td>
                  <Td isNumeric> +2$</Td>
                  <Td isNumeric>
                    {" "}
                    <Text fontWeight="bold" display="inline-table">
                      -$242
                    </Text>
                    .00
                  </Td>
                </Tr>
                {/* ))} */}
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="avatar-1.jpg" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          Amazon
                        </Heading>
                        <Text fontSize="sm" color="gray">
                          Apr 24, 2021 at 1:40pm
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td> Electronic Devices </Td>
                  <Td isNumeric> +2$</Td>
                  <Td isNumeric>
                    {" "}
                    <Text fontWeight="bold" display="inline-table">
                      -$242
                    </Text>
                    .00
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="avatar-1.jpg" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          Amazon
                        </Heading>
                        <Text fontSize="sm" color="gray">
                          Apr 24, 2021 at 1:40pm
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td> Electronic Devices </Td>
                  <Td isNumeric> +2$</Td>
                  <Td isNumeric>
                    {" "}
                    <Text fontWeight="bold" display="inline-table">
                      -$242
                    </Text>
                    .00
                  </Td>
                </Tr>
                {display === "show" && (
                  <>
                    {/* {bscScanData?.map((trans) => ( */}
                    <Tr>
                      <Td>
                        <Flex align="center">
                          <Avatar size="sm" mr={2} src="avatar-1.jpg" />
                          <Flex flexDir="column">
                            <Heading size="sm" letterSpacing="tight">
                              Amazon2
                            </Heading>
                            {/* <Text fontSize="sm" color="gray">{trans.blockhash}</Text> */}
                          </Flex>
                        </Flex>
                      </Td>
                      <Td> Electronic Devices </Td>
                      <Td isNumeric> +2$</Td>
                      <Td isNumeric>
                        {" "}
                        <Text fontWeight="bold" display="inline-table">
                          -$242
                        </Text>
                        .00
                      </Td>
                    </Tr>
                    {/* ))} */}
                  </>
                )}
              </Tbody>
            </Table>
          </Flex>
          <Flex align="center">
            <Divider />
            <IconButton
              icon={display === "show" ? <FiChevronUp /> : <FiChevronDown />}
              onClick={() => {
                if (display == "show") {
                  changeDisplay("none");
                } else {
                  changeDisplay("show");
                }
              }}
            />
            <Divider />
          </Flex>
        </Flex>
      </Flex>
      {/* column 3 */}
      <Flex
        w={["100%", "100%", "35%"]}
        minW={[null, null, "300px", "300px", "400px"]}
        bgColor="#F5F5F5"
        p="3%"
        flexDir="column"
        overflow="auto"
      >
        <Flex alignContent="center">
          {/* <Button
            // bgGradient='linear(to-l, #7928CA, #FF0080)'
            id="button-connect-wallet"
            borderRadius="3xl"
            border="1px"
            w="100%"
            borderColor="gray.200"
            py="6"
            fontSize="sm"
            letterSpacing="wide"
            fontWeight="bold"
            onClick={() => connect()}
            // isLoading={isAuthenticating} onClick={() => authenticate()}
          >
            Connect Wallet
          </Button> */}



                     
          <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div id="button-connect-wallet"
style={{  alignItems:"center",alignContent:"center", width:"100%",border:"1px", fontSize:"18px",borderRadius:"30px", padding:"0.7rem",textAlign:"center" }} 
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                display: 'flex', alignItems: 'center'
                            
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" style={{fontWeight:700, alignContent:"center",textAlign:"center",alignItems:"center",width:"100%" }} >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom> 

          
        </Flex>
        <Flex alignContent="center"></Flex>
      </Flex>
    </Flex>
  );
}
}