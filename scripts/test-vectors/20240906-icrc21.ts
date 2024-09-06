import { Cbor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { defaultCaller, writeToJson } from "./utils";

const consentMessageCertificate = "D9D9F7A3647472656583018301820458204E16E40C20EE1B74087B9B6B275F8992523578204233291F9619BBB7AC64CF9E830182045820CBFC3A4F00D2B0D4CFE75B568D38D70A28DD7DCBB29B237E007A2359F31E4D6983024E726571756573745F737461747573830182045820D3A070963190E5341E913D713927A240FC56837ACDB54BC1E962A58212E2157F8301830182045820E1ACDEF14B028D145D3D841496BF85BFAF16EC09832C1A581C86F906F0CE25648301820458207BC6DD6116A600B6A70192ED06B57DF9DE0E15AD9E75CF6D8BBA332C98EC0EAF8301830182045820AD315BA046113BCA1D91891EEFEA5A9E0809186E51165A7A4CD4395EE396854A830182045820E493BB04199197D7674B6B869D794E510CA71B3D35408287A9D1D5460221E8F88301830183018301830183025820E97B57187EEEA754188827B5757334E98262862E93FE956B1A36D8E9882BBD3D83018302457265706C7982035903144449444C0C6B02BC8A0101C5FED201096C02EFCEE7800402E29FDCC806046C02AEAEB1CC0503D880C6D007716E766B02D9E5B0980405FCDFD79A0F716C01C4D6B4EA0B066D076C01FFBB87A807086D716B04D1C4987C0AA3F2EFE6020B9A8597E6030BE3C581900F0B6C02FC91F4F80571C498B1B50D7D6C01FC91F4F80571010000013C0002656E000E030B2320417574686F72697A6512616E6F74686572206164647265737320746F1277697468647261772066726F6D20796F7572030D6163636F756E74202A2A54686511666F6C6C6F77696E6720616464726573730D697320616C6C6F77656420746F031277697468647261772066726F6D20796F75720A6163636F756E743A2A2A12786C6D64672D766B6F737A2D63656F70782D031237777467752D6733786D642D6B6F6979632D1261777161712D376D6F647A2D7A663672362D1033363472682D6F7165202A2A596F7572030D5375626163636F756E743A2A2A0932767873782D6661650B2A2A526571756573746564030A7769746864726177616C0C616C6C6F77616E63653A2A2A11312E323334353620636B42544320E29AA0031254686520616C6C6F77616E63652077696C6C1162652073657420746F20312E323334353605636B4254430310696E646570656E64656E746C79206F660C616E792070726576696F757310616C6C6F77616E63652E20556E74696C031074686973207472616E73616374696F6E11686173206265656E2065786563757465640F746865207370656E6465722063616E03127374696C6C206578657263697365207468651270726576696F757320616C6C6F77616E63651028696620616E792920746F2069742773030C66756C6C20616D6F756E742E0C2A2A45787069726174696F6E0F646174653A2A2A205468752C203139031153657020323032342030323A33303A3232102B30313030202A2A417070726F76616C106665653A2A2A20302E303030303030310305636B425443122A2A5472616E73616374696F6E206665657312746F206265207061696420627920796F7572020D7375626163636F756E743A2A2A0932767873782D6661658302467374617475738203477265706C696564820458203A48763F894231792AC6D958C7570A017CCD505D3D4EF23BCD29D91AF012628D820458205299D702C3FA6395684CC020FE9D5933830DB0C4E23822D8F6724AD99C333FDD820458203494C2535AD0925D45154EB1A135C5E625D29BF46D471C049C0AE7FEE75505E182045820AB45474F69EBC08B356D7208EDECC78D62E96EE80A0155EB243D6825FF38D33C8204582099377DA70467B88B20DDFE5DE17278FEFA31E0668D5F7FF57C8423FC068F2B868204582068264C142DAB03B8E9BBC6AC25681C076A40E4BF395E245A10110B6F5090284782045820B0734E1E151CFC99B9E53DFF6DC24ABD009A9369F2F83C364709017E8E4103FF8301820458200BB2E275A73109CD1FFBE4DC94307DDC6EBB85FF9252F0C1B7D10A59D62224B183024474696D65820349A4A894AD8288AAF917697369676E617475726558309674248E8DC6881BD6F6D76CFF764505AC5BF06DE3B7AB45B6B4CA121633FC42BCED918387576E44F51E74D1C838C8296A64656C65676174696F6EA2697375626E65745F6964581D4F82B62EDFFA3FA4E6A5C48327CE8CFB3F850DB2E5ABC90E955D77F0026B636572746966696361746559027DD9D9F7A2647472656583018204582099E54918B834F851079D4C0237776DC2BE56EE42C6674FB61388F3ACF2E240F68301830182045820C05469F38690680761511C6BD7540CAA54CE83FF0674DD788E9D84694917B6628302467375626E657483018301830182045820B833149E7345B2969DDEF5A85A5EC2B92B9AA412154E8C6FEABF6E6F564FA4EC830182045820466A70286CF9ACE9801CA53E22AF6EE059A094FD60498606D484B6854058307D8301820458203CA2C554909D39F9BB831060C235D7A3AFED4E87078BD8F9C362A02CD65BF47C830182045820CD351619165247C1C294B8921740AF49200D292986AB0536FD2B70C3533A4F0F8302581D4F82B62EDFFA3FA4E6A5C48327CE8CFB3F850DB2E5ABC90E955D77F002830183024F63616E69737465725F72616E6765738203581BD9D9F781824A000000000230000001014A00000000023FFFFF010183024A7075626C69635F6B657982035885308182301D060D2B0601040182DC7C0503010201060C2B0601040182DC7C05030201036100A32153E6271817B87D91D1CD0B727119A2EDA7355EE7EF64EE9F10BF6396AED6899A5475D37D6CC51C6A741397D3685318E8E0DABEC1B1994112E2C4DA3262033EA18FC667DD0EAD6E0A151F4D884EE644B799C05E56F502D42F22FFABBCA097820458206961EF137C2AEE0B0467082EF6D3C12C03E93013B602A4CB6214270E484863F1820458208C3E7995210D66B6E658BCFDCB0265CB267B5611A8A9607C117F099156D7131683024474696D658203499CE683EBC2B397F917697369676E6174757265583096689A606287F332142B528F20EF52E8F55EA9C3F8F422FDB4D2D9D98BCA0ACD993679DCCB5727FB9917AC775A992FAB";

function hexStringToArrayBuffer(hexString: string): ArrayBuffer {
  // Remove any non-hexadecimal characters (e.g., spaces)
  hexString = hexString.replace(/[^a-fA-F0-9]/g, "");

  // Ensure the string has an even length
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  // Create an ArrayBuffer with the appropriate length
  var arrayBuffer = new ArrayBuffer(hexString.length / 2);
  var uint8Array = new Uint8Array(arrayBuffer);

  // Convert each pair of hex characters to a byte
  for (var i = 0; i < hexString.length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }

  return arrayBuffer;
}

const callRequest = {
  arg: hexStringToArrayBuffer("4449444C066E7D6D7B6E016E786C02B3B0DAC30368AD86CA8305026C08C6FCB60200BA89E5C20402A2DE94EB060282F3F3910C03D8A38CA80D7D919C9CBF0D00DEA7F7DA0D03CB96DCB40E040105000000008094EF3A0001004CA1201281F617011D4E9644473EFFB4CD436EEC1A9C8C08168021F63879C97D1F6FDC89DD0200"),
  canister_id: Principal.fromHex("00000000023000060101"),
  ingress_expiry: BigInt("1725626939615000000"),
  method_name: "icrc2_approve",
  request_type: "call",
  sender: defaultCaller,
  nonce: hexStringToArrayBuffer("907C228E7F85CBE63366D8B32A710DA6")
};

const consentMessageRequest = {
  arg: hexStringToArrayBuffer(
    "4449444C086D7B6E766C02AEAEB1CC0501D880C6D007716C02CBAEB581017AB183E7F1077A6B028BEABFC2067F8EF1C1EE0D036E046C02EFCEE7800402C4FBF2DB05056C03D6FCA70200E1EDEB4A7184F7FEE80A06010780014449444C066E7D6D7B6E016E786C02B3B0DAC30368AD86CA8305026C08C6FCB60200BA89E5C20402A2DE94EB060282F3F3910C03D8A38CA80D7D919C9CBF0D00DEA7F7DA0D03CB96DCB40E040105000000008094EF3A0001004CA1201281F617011D4E9644473EFFB4CD436EEC1A9C8C08168021F63879C97D1F6FDC89DD02000D69637263325F617070726F7665013C0002656E010112000300",
  ),
  canister_id: Principal.fromHex("00000000023000060101"),
  ingress_expiry: BigInt("1725626839615000000"),
  method_name: "icrc21_canister_call_consent_message",
  nonce: hexStringToArrayBuffer("2FFBD7295F2EF09C4DA2198A6B30F817"),
  request_type: "call",
  sender: Principal.fromHex("04"),
};

const createCandidBlobs = () => {
  const callRequestBlob = Buffer.from(
    Cbor.encode({ content: callRequest }),
  ).toString("hex");
  const consentMessageRequestBlob = Buffer.from(
    Cbor.encode({ content: consentMessageRequest }),
  ).toString("hex");

  writeToJson({
    data: { callRequestBlob, consentMessageRequestBlob, consentMessageCertificate },
    fileName: "icrc21-icrc2_approve.json",
  });
};

createCandidBlobs();
