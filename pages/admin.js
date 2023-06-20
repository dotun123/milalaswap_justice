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
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'

  import { contractABI,contractAddress } from "./abi/utils/constant";
  import { contractABI2,contractAddress2 } from "./abi/utils/constant";
  import { contractABI3,contractAddress3 } from "./abi/utils/constant";
  import { useContractRead } from 'wagmi'
  import { useContractEvent } from 'wagmi'
  import { useContractWrite, usePrepareContractWrite } from 'wagmi'

  export default function Admin(){














// const [allowValue, setAllowValue] = useState(0);
  // const [ownerValue, setOwnerValue] = useState(0);
    // const [milaBalance, setMilaBalance] = useState(0);
    // const [allowanceBalance,setAllowanceBalance ] = useState(0);
    // const { address, connector, isConnected } = useAccount()




    // const { data: milaAllowance, error: allowanceError } = useContractRead({
    //   address:contractAddress,
    //   abi: contractABI,
    //   functionName: "allowance",
    //   args:[ownerAddress,address]
    //    })
  


        // useEffect(() => {
    //   if (milaAllowance) {
    //     let Allow = milaAllowance;
    //     setAllowanceBalance(Allow);
    //   }
    // }, [milaAllowance]);
  
    /* console.log data to view variables */
    //  useEffect(() => {
     
    //    console.log("MilaAllowance:", milaAllowance);
    //  })
  








    // const { data: ownerBalance, error: ownerBalanceError } = useContractRead({
    //   address:contractAddress,
    //   abi: contractABI,
    //   functionName: "balanceOf",
        //  args:[ownerAddress],
    // })
  
    // useEffect(() => {
    //   if (ownerBalance) {
    //     let own = ownerBalance;
    //     setOwnerData(own);
    //   }
    // }, [ownerBalance]);
  
    // /* console.log data to view variables */
    // // useEffect(() => {
     
    // //   console.log("ownerBalance:", ownerBalance);
    // // })









    // const { config:allowanceIncrease } = usePrepareContractWrite({
    //   address: contractAddress,
    //   abi: contractABI,
    //   functionName: 'increaseAllowance',
    //   args:[address,parseInt(allowValue)]
    // })
    // const { data:allowanceData,  isSuccess, write:writeAllowance } = useContractWrite(allowanceIncrease)
    
    
    
    
    // const { config:configMint } = usePrepareContractWrite({
    //   address: contractAddress,
    //   abi: contractABI,
    //   functionName: 'mint',
    //   args:[address,parseInt(ownerValue)],
    // })
    // const { data:mintData,  isSuccess:mintSuccess, write:writeMint } = useContractWrite(configMint)
    
    
    
    
















return(

  <Flex  
  justifyContent={"space-between"}
  w={"50%,70%"} >
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
          <Text fontWeight="medium"> MILA</Text>
        
        </Flex>

        <Flex flexDir="row" align="center">
          <Flex flexDir="column">
            <Text
              fontSize="ms"
              fontWeight="bold"
              mx="2"
              align="end"
              color="gray.500"
            >
              Allowance Bal:
            </Text>
            {allowanceBalance.tostring()}
           
          </Flex>
       
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
          onChange={(e) => setAllowValue(e.target.value)}
                        
                        value={allowValue}
        />
      </Flex>
     

      <Flex align="center" mt={3}>
        <Divider />

        <Divider />
      </Flex>

    
      <Flex flexDir="row" w={"100%"} justifyContent="flex-end">
        <Button
          w={"100%"}
          py={5}
          borderRadius="15px"
          bgColor="#dc35464b"
          // isDisabled={sellButtonDisabled == true}
          mt={5}
          // onClick={() => swapBnbForUsdt()}
          // isLoading={approveLoadingSell}
          // disabled
        >
          Increase Allowance
        </Button>
      </Flex>
    </Flex>
    <Flex></Flex>
  </Box>
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
          <Text fontWeight="medium"> MILA</Text>
        
        </Flex>

        <Flex flexDir="row" align="center">
          <Flex flexDir="column">
            <Text
              fontSize="ms"
              fontWeight="bold"
              mx="2"
              align="end"
              color="gray.500"
            >
              MILA Bal:
            </Text>
            {milaBalance.tostring()}
           
          </Flex>
       
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
          onChange={(e) => setOwnerValue(e.target.value)}
                     
                        value={ownerValue}
        />
      </Flex>
     

      <Flex align="center" mt={3}>
        <Divider />

        <Divider />
      </Flex>

    
      <Flex flexDir="row" w={"100%"} justifyContent="flex-end">
        <Button
          w={"100%"}
          py={5}
          borderRadius="15px"
          bgColor="#dc35464b"
          // isDisabled={sellButtonDisabled == true}
          mt={5}
          // onClick={() => swapBnbForUsdt()}
          // isLoading={approveLoadingSell}
          // disabled
        >
         MINT
        </Button>
      </Flex>
    </Flex>
    <Flex></Flex>
  </Box>
  </Flex>
  
)
  };