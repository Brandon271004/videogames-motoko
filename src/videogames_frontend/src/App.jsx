import { useEffect, useState } from 'react';
import { videogames_backend } from 'declarations/videogames_backend';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import  Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
function App() {
  const [videogames, setGames] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getGames();
  }, []);

  function getGames() {
    Swal.fire("Cargando Contenido...");
    Swal.showLoading();
    videogames_backend.getAllGames().then(videogames => {
      setGames(videogames);
      Swal.close();
    });
  }

  return (
    <Container className='m-3'>
      <Row className='m-5'>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title> Listado de Videojuegos</Card.Title>
              </Col>
              <Col className='m-3'>
                <Button variant="success" onClick={()=>navigate('/agregar-videojuego')}>Crear videojuego</Button>
                </Col>
            </Row>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>

                {
                  videogames.length > 0 ?
                    videogames.map((games) => (
                      <tr>
                        <td>{Number(games.id)}</td>
                        <td>{games.title}</td>
                        <td>{games.description}</td>
                        <td>{Number(games.rating)}</td>
                      </tr>
                    ))
                    : <tr></tr>
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default App;
