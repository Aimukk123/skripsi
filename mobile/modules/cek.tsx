import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CekSatu from './cek1';
import useSafeState from '../state'

interface cek {

}

export default function cek(props: cek): any {

  const [data, setData] = useSafeState({})
  const booking_ids = [
    440,
    441,
    442,
    443,
    438,
    439
  ]

  const obj = booking_ids.reduce((o, key) => ({ ...o, [key]: { 'id': String(key), 'total': 0 } }), {})

  useEffect(() => {
    // console.log(obj);

  }, [data])

  function submit() {
    // const b = Object.values(data).map(item => item)
    // const c = Object.values(obj).map(item => item)
    // const a = c.map((obje: any) => b.find((o: any) => o.id === obje.id) || obje)

    console.log(Object.keys(data));

    const post = {
      'booking_ids': booking_ids.join('|'),

    }
  }

  const type = [
    {
      "qty": 6,
      "qty_used": 0,
      "type_background": "#FFF",
      "type_name": "Tiket Khusus",
      "list": [
        {
          "booking_id": "440",
          "qty": "2",
          "qty_used": "0",
        },
        {
          "booking_id": "443",
          "qty": "4",
          "qty_used": "0",
        },
      ]
    },
    {
      "qty": 1,
      "qty_used": 0,
      "type_background": "#2590FE",
      "type_name": "Undangan Exhibitor",
      "list": [
        {
          "booking_id": "439",
          "qty": "1",
          "qty_used": "0",
        },
      ],
    },
    {
      "qty": 7,
      "qty_used": 0,
      "type_background": "#FFF",
      "type_name": "Reguler",
      "list": [
        {
          "booking_id": "438",
          "qty": "2",
          "qty_used": "0",
        },
        {
          "booking_id": "441",
          "qty": "3",
          "qty_used": "0",
        },
        {
          "booking_id": "442",
          "qty": "2",
          "qty_used": "0",
        },
      ],
    },
  ]

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff', marginTop: 20, }}>
        {
          type.map((item, i) => {
            return (
              <CekSatu item={item} key={i}
                onUse={(hsl, id) => {
                  let obj = {
                    [id]: {
                      'id': id,
                      'total': hsl
                    }
                  }
                  setData({ ...data, ...obj })
                }
                } />
            )
          })
        }
      </ScrollView>
      <TouchableOpacity onPress={submit} style={{ width: 200, height: 60, backgroundColor: 'orange', marginBottom: 30 }}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}