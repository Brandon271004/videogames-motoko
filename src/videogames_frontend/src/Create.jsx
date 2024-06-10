import React, { useState } from 'react';
import { Form, Button, Container, Row,Col, Card, CardBody } from 'react-bootstrap';
import { videogames_backend } from 'declarations/videogames_backend';
import  Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



const Create = () => {
  const [title,setTitle] = useState("");
  const [descripcion,setDescription] = useState("");
  const [rating,setRating] = useState(0);

  const navigate = useNavigate();

  const onChangeTitle = (e)=>{
    e.preventDefault();
    console.log("valor del target",e.target);
    const preTitle = e.target.value;
    setTitle(preTitle);
  }
  const onChangeDescription = (e)=>{
    e.preventDefault();
    const preDescription = e.target.value;
    setDescription(preDescription);
  }
  const onChangeRating = (e)=>{
    e.preventDefault();
    const preRating = e.target.value;
    setRating(preRating);
  }
  function createGameList() {
    Swal.fire("Cargando Contenido...");
    Swal.showLoading();
    videogames_backend.addVideogame(BigInt(rating),title,descripcion).then(Games => {
      Swal.fire({
        title: "Succesfully",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pcmag.com%2Fpicks%2Fthe-best-multiplayer-video-games&psig=AOvVaw326yQUQET5UFVgXZKPpqgY&ust=1718061744505000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCDzPPUz4YDFQAAAAAdAAAAABAJ)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fsearch%2Fnyan-cat-png-gifs&psig=AOvVaw1gwLWRFyP6tRcwk67uXKYJ&ust=1718064284481000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDZk7rez4YDFQAAAAAdAAAAABAE")
          left top
          no-repeat
        `
      }).then(()=>navigate('/'))
    }).catch((err)=>{
      Swal.fire({
        icon:"error",
        title:"opss ocurrio un error",
      });
      console.log("Error al intentar al crear videojuegos",err)
    })
  }

  return (
    <Container className='m-5'>
      <Row className='m-5'>
          <Card>
            <Card.Title> Agregar Videojuego</Card.Title>
            <CardBody>
              <Form>
                <Row>
                  <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Ingresa el Videojuego</Form.Label>
                  <Form.Control name="title" onChange={onChangeTitle} type="text" placeholder="Videojuego" />
                </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Ingresa la descripcion breve del Videojuego:</Form.Label>
                  <Form.Control name="description" onChange={onChangeDescription} as="textarea" placeholder="Descripcion" />
                </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Ingresa el rating del Videojuego</Form.Label>
                  <Form.Control name="rating" onChange={onChangeRating} type="number" placeholder="Videojuego"/>
                </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                <Button variant="primary" onClick={createGameList}>
                  Guardar Datos del Videojuego
                </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
      </Row>
    </Container>
  );

}
export default Create;