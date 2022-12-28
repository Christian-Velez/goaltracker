import {
   ChakraProvider,
   Popover,
   PopoverTrigger,
   Button,
   PopoverContent,
   PopoverArrow,
   PopoverCloseButton,
   PopoverHeader,
   PopoverBody,
   Center,
   SimpleGrid,
   extendTheme,
   Box,
   Flex,
   FormLabel,
} from '@chakra-ui/react'

const theme = extendTheme({
   components: {
      Popover: {
         variants: {
            picker: {
               popper: {
                  maxWidth: 'unset',
                  width: 'unset',
               },
            },
         },
      },
   },
})

type ColorPickerProps = {
   label: string
   value: string
   setValue: (value: string) => void
}

export const ColorPicker = ({ label, value, setValue }: ColorPickerProps) => {
   const colors = [
      'gray',
      'yellow',
      'orange',
      'red',
      'green',
      'teal',
      'blue',
      'cyan',
      'purple',
      'pink',
   ]

   return (
      <ChakraProvider theme={theme}>
         <Flex w='full' justifyContent='center' gap={3}>
            <Popover variant='picker'>
               <PopoverTrigger>
                  <Button
                     aria-label={value}
                     background={`${value}.100`}
                     height='22px'
                     width='22px'
                     padding={0}
                     minWidth='unset'
                     borderRadius={3}
                     border='1px solid'
                     margin='0'
                     size='lg'
                  />
               </PopoverTrigger>
               <PopoverContent width='170px'>
                  <PopoverArrow bg={`${value}.200`} />
                  <PopoverCloseButton color='white' />
                  <PopoverHeader
                     height='100px'
                     backgroundColor={`${value}.200`}
                     borderTopLeftRadius={5}
                     borderTopRightRadius={5}
                     color='white'
                  >
                     <Center height='100%'>{value}</Center>
                  </PopoverHeader>

                  <PopoverBody height='120px'>
                     <SimpleGrid columns={5} spacing={2}>
                        {colors.map((c) => (
                           <Button
                              key={c}
                              aria-label={c}
                              background={`${c}.300`}
                              _hover={{ background: `${c}.400` }}
                              height='22px'
                              width='22px'
                              padding={0}
                              minWidth='unset'
                              borderRadius={3}
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setValue(c)
                              }}
                           ></Button>
                        ))}
                     </SimpleGrid>
                  </PopoverBody>
               </PopoverContent>
            </Popover>

            <Box display='inline-block' mr={3}>
               <FormLabel>{label}</FormLabel>
            </Box>
         </Flex>
      </ChakraProvider>
   )
}
