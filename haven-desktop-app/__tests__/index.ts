import { checkForUnpackedPath} from "../src/daemonPaths";
import { destroySocket } from "../src/dev";
import { RPCHRequestHandler } from "../src/rpc/RPCHRequestHandler";

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    destroySocket();
});

const LOCAL_HOST_URL = "http://localhost:";
const PORT = 12345;


describe("RPC Request Handler", () => {
    it("should set full URL when setHost is called", () => {
        const rpcRequestHandler = new RPCHRequestHandler();
        const spy = jest.spyOn(rpcRequestHandler, "setFullUrl");
        rpcRequestHandler.setHost("http://localhost");
        rpcRequestHandler.port = PORT;
        expect(spy).toHaveBeenCalledWith(LOCAL_HOST_URL + PORT);
    });

    it("should set full URL when setPort is called", () => {
        const rpcRequestHandler = new RPCHRequestHandler();
        const spy = jest.spyOn(rpcRequestHandler, "setFullUrl");
        rpcRequestHandler.port = PORT;
        expect(spy).toHaveBeenCalledWith(LOCAL_HOST_URL + PORT);
    });
});


describe("Utilities", () => {
    it("should correctly check for unpackedPath and return new path", () => {
        const mockPath = "mocked/app.asar/userData";
        const expectedPath = "mocked/app.asar.unpacked/userData";
        expect(checkForUnpackedPath(mockPath)).toEqual(expectedPath);
    });
});


