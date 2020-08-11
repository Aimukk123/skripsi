import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import CekDua from './cek2';
import useSafeState from '../state'

interface CekSatu {
  item: any,
  onUse?: (hsl, id) => void
}

export default function CekSatu(props: CekSatu): any {
  const { item } = props
  // const [data, setData] = useSafeState({})

  // useEffect(() => {
  //   console.log(data);
  // }, [data])

  return (
    <View>
      <Text>{item.type_name}</Text>
      {
        item.list.map((item2, i2) => {
          return (
            <CekDua key={i2} item2={item2} onSelect={(id, total) => {
              props.onUse(total, id)
              // let oo = {
              //   [id]: {
              //     'id': id,
              //     'total': total
              //   }
              // }
              // setData({ ...data, ...oo })
              // // console.log(a);


            }} />
          )
        })
      }
    </View>
  )
}