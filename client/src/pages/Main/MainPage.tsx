import { useNavigate } from 'react-router';
import SiteTitle from '../../components/Site-title/SiteTitle';
import { useUserSelector } from '../../redux/selectors';
import { routesData } from '../../utils/data';
import './MainPage.scss';
import MainButton from '../../components/main-button/MainButton';

function MainPage() {
  const { linkPage, online, computer } = routesData;
  const navigate = useNavigate();
  console.log(2);
  const { userData: isLoggedIn } = useUserSelector();
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
