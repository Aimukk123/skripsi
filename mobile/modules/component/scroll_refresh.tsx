import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import useSafeState from '../../state'

interface ComponentScroll_refresh {
  onRefresh?: () => void,
  children: any
}

export default function ComponentScroll_refresh(props: ComponentScroll_refresh): any {
  const [refreshing, setRefreshing] = useSafeState(false)

  function wait(timeout: number) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout)
    })
  }

  function onRefresh(refresh: () => void) {
    setRefreshing(true)
    refresh()
    wait(2000).then(() => setRefreshing(false));
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => { props.onRefresh != undefined && onRefresh(props.onRefresh) }} />
      }
    >
      {
        props.children
      }
    </ScrollView>
  )
}