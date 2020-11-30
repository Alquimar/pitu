import React from 'react';
import Header from '../../components/Header';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import { ContentContainer, Form, AdsBlock } from './styles';
import ShortnerService from '../../services/shortenerService';
import vars from '../../configs/vars';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        // state é importante para definir quais o parâmetros/atributos
        // que serão passados na execução da página em questão
        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMessage: '',
        };
    }

    // 
    handleSubmit = async (event) => {
        // Cancela o evento, para eviar o POST
        event.preventDefault();

        const { url } = this.state;

        this.setState({ isLoading: true, errorMessage: '' });

        if (!url) {
            this.setState({ isLoading: false, errorMessage: 'Informe uma url para encurtar.' });
        } else {
            try {
                // Chamada para o backend
                const service = new ShortnerService();
                const result = await service.generate({ url });

                this.setState({ isLoading: false, code: result.code });
            } catch (error) {
                this.setState({ isLoading: false, errorMessage: 'Ops, ocorreu um erro ao tentar encurtar a url.' });
            }
        }
    }

    // Função responsável por copiar o valor do inputURL
    copyToClipboard = () => {
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');
    }

    render() {
        // Definir as propriedades do state que serão utilizadar no render
        const { isLoading, errorMessage, code } = this.state;

        return (
            <Container>
                <Header>Seu novo encurtador de URL. :)</Header>
                <ContentContainer>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Digite a url para encurtar"
                                defaultValue=""
                                // Setar o valor do input para o state
                                // toda vez que o valor do input for alterado
                                onChange={e => this.setState({ url: e.target.value })}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {/* Validação */}
                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : (
                                code && (
                                    <>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                autoFocus={true}
                                                defaultValue={vars.HOST_APP + code}
                                                // Referenciando o componente em questão (input)
                                                // e atribuindo a uma variável chamada inputURL
                                                // para poder copiar o seu valor posteriormente
                                                ref={(input) => this.inputURL = input}
                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" onClick={() => this.copyToClipboard()}>Copiar</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                        <p>Para acompanhar as estatísticas, acesse {vars.HOST_APP + code}/stats</p>
                                    </>
                                )
                            )}
                            
                        {/* Tratamento de erro */}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    </Form>
                </ContentContainer>
                <ContentContainer>
                    <AdsBlock>Adsense</AdsBlock>
                </ContentContainer>
            </Container>
        )
    }
}

export default HomePage;