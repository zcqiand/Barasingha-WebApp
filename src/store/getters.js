const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  AccessToken: state => state.user.AccessToken,
  UserId: state => state.user.UserId,
  NickName: state => state.user.NickName,
  AvatarUrl: state => state.user.AvatarUrl
}
export default getters
