import { useNavigate } from 'react-router';
import SiteTitle from '../../components/Site-title/SiteTitle';
import { useUserSelector } from '../../redux/selectors';
import { routesData } from '../../utils/data';
import './MainPage.scss';
import MainButton from '../../components/main-button/MainButton';
import { useGetMatchHistory } from '../../utils/apiService/getRequest/hooks';

function MainPage() {
  const { linkPage, online, computer } = routesData;
  const navigate = useNavigate();
  const { isLoggedIn } = useUserSelector();
  const buttonsArray = [
    {
      name: 'Play against computer',
      route: computer,
      disable: false,
    },
    {
      name: 'Play against friend',
      route: linkPage,
      disable: !isLoggedIn,
    },
    { name: 'Play online', route: online, disable: !isLoggedIn },
  ];
  const bla = useGetMatchHistory();
  return (
    <div className="main-page">
      <SiteTitle />
      <div className="buttons-container">
        {buttonsArray.map(({ name, route, disable }) => (
          <MainButton
            key={route}
            onClick={() => navigate(route)}
            disabled={disable}
          >
            {name}
          </MainButton>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
