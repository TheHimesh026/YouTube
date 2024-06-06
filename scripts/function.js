async function fetchRequest(url){
  const response = await fetch(url);
  const data = await response.json();
  const sortedData = await sortData(data);
  const channelInfo = await fetchChannelData(sortedData);
  const result = await finalSort(sortedData,channelInfo.items);
   return result;
};

async function sortData(data){
  const sortedData = await data.items.map(item => {
    const { id,snippet } = item;
    const { thumbnails,channelId,channelTitle,title } = snippet;
    return {
      videoId:id,
      thumbnails,
      channelId,
      channelTitle,
      title
    }
  });
  return sortedData;
};

async function fetchChannelData(data){
  const channelId = data.map(item => item.channelId);
  const joinedId = channelId.join(",");
  const KEY = import.meta.env.VITE_YOUTUBE_KEY;
  const BASE_URL = import.meta.env.VITE_YOUTUBE_BASE_URL;
  //url
  const channelDataURI = `${BASE_URL}/channels?part=snippet&id=${joinedId}&key=${KEY}`;
  //request
  const response = await fetch(channelDataURI);
  const channelData = await response.json();
  return channelData;
};

async function finalSort(data, channelInfo) {
  const matchedItems = data.map(item => {
    const match = channelInfo.find(channelId => channelId.id === item.channelId);
    return {
      ...item,
      channelInfo: match
    };
  });
  return matchedItems;
};

export {
  fetchRequest,
  fetchChannelData,
  sortData
};