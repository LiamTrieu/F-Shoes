import React, { useEffect, useState } from "react";
import clientApi from "../api/clientApi";
import Loading from "../layout/Loading";
import { useDispatch } from "react-redux";
import { url } from "../service/url";
import { Stomp } from "@stomp/stompjs";
import * as encoding from "text-encoding";
import SockJS from "sockjs-client";
import uuid from "react-native-uuid";
import { setOrder } from "../service/slices/orderSilce";

var stompClient = null;
const idApp = uuid.v4();
export default function Init({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clientApi.check();
        const urlSocket = url + "/shoes-websocket-endpoint";
        stompClient = Stomp.over(() => new SockJS(urlSocket));
        stompClient.connect({}, () => {
          stompClient.subscribe(`/topic/app-online/${idApp}`, (message) => {
            const data = JSON.parse(message.body);
            dispatch(setOrder(data.idOrder));
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return children;
}

export function getStomptClient() {
  return stompClient;
}
export function getIdApp() {
  return idApp;
}
