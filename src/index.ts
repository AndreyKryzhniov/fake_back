import express, {Request, Response, NextFunction} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()

app.use(cors());

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// log middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', new Date().toString());
    console.log(req.method, req.url, 'params:', req.params);
    console.log('query:', req.query);
    console.log('body:', req.body);
    console.log('cookies:', req.cookies);
    // console.log('headers:', req.headers);
    // console.log('rawHeaders:', req.rawHeaders);
    next();
});

const fakeState = {
    counter: 0
}


const someRouter = express.Router()
someRouter.get('/y', (req: Request, res: Response) => {
    fakeState.counter += 1
    res.status(200).json({z: req.query, count: fakeState.counter})
})

app.use('/x', someRouter)

mongoose.connect(
    'mongodb+srv://andrey_kryzhniov:mpz70mpz@cluster0-fyuug.mongodb.net/fake_data?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connect')
        app.listen(process.env.PORT, () => {
            console.log("Neko-back listening on port: " + process.env.PORT)
        })
    })
    .catch((err) => {
        console.log('error:' + err)
    })

