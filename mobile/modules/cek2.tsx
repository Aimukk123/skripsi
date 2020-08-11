import React, { useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import useSafeState from '../state'


interface CekDua {
  item2: any
  onSelect?: (id, total) => void
}

export default function CekDua(props: CekDua): any {
  const { item2 } = props
  const [ticket, setTicket] = useSafeState([])
  const [counter, setCounter] = useSafeState(0)

  const qty = Number(item2.qty)

  useEffect(() => {
    setTicket(new Array(qty).fill(0))
  }, [])

  function setTicketUsed(value: any, index: number, id: any): void {
    let _ar = ticket
    _ar[index] = value
    setTicket(_ar)
    setCounter(counter + 1)

    if (props.onSelect != undefined) {
      var total = 0
      for (let i = 0; i < ticket.length; i++) {
        total += ticket[i];
      }
      props.onSelect(id, total)
    }


  }


  return (
    <View>
      {
        ticket && ticket.map((item3, i3) => {
          return (
            <View key={i3} style={{ backgroundColor: "skyblue", width: 300, height: 80, padding: 10, margin: 5, flexDirection: 'row' }}>
              <Text>{item3 + '  ' + item2.booking_id}</Text>
              {
                item3 == 0 ?
                  <TouchableOpacity onPress={() => { setTicketUsed(1, i3, item2.booking_id) }} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '000', width: 50, height: 40, alignItems: 'center' }}>
                    <Text>Pakai</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => { setTicketUsed(0, i3, item2.booking_id) }} style={{ backgroundColor: 'orange', borderWidth: 1, borderColor: '000', width: 50, height: 40, alignItems: 'center' }}>
                    <Text>Batal</Text>
                  </TouchableOpacity>
              }
              <Text>{i3}</Text>
            </View>
          )
        })
      }
    </View>

  )
}