import styled from 'styled-components';

const Container = styled.div<{ theme: string }>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
    theme === 'dark' ? 'linear-gradient(to right, #000428, #004e92)' : '#f7fafc'};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
`;

const Home = () => {
  const [theme, setTheme] = useState('light');

  return (
    <Container theme={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </Container>
  );
};

export default Home;
