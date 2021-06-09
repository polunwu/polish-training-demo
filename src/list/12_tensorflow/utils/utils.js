// (CHECK): https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
// -2: not jpeg
// -1: not defined

function getOrientation(fileReaderResult) {
  let view = new DataView(fileReaderResult);

  if (view.getUint16(0, false) != 0xffd8) {
    return -2;
  }

  var length = view.byteLength;
  var offset = 2;
  while (offset < length) {
    if (view.getUint16(offset + 2, false) <= 8) return -1;
    var marker = view.getUint16(offset, false);
    offset += 2;
    if (marker == 0xffe1) {
      if (view.getUint32((offset += 2), false) != 0x45786966) {
        return -1;
      }

      var little = view.getUint16((offset += 6), false) == 0x4949;
      offset += view.getUint32(offset + 4, little);
      var tags = view.getUint16(offset, little);
      offset += 2;
      for (var i = 0; i < tags; i++) {
        if (view.getUint16(offset + i * 12, little) == 0x0112) {
          return view.getUint16(offset + i * 12 + 8, little);
        }
      }
    } else if ((marker & 0xff00) != 0xff00) {
      break;
    } else {
      offset += view.getUint16(offset, false);
    }
  }

  return -1;
}

function convertRotationToDegrees(rotation) {
  let rotationInDegrees = 0;
  switch (rotation) {
    case 8:
      rotationInDegrees = 270;
      break;
    case 6:
      rotationInDegrees = 90;
      break;
    case 3:
      rotationInDegrees = 180;
      break;
    default:
      rotationInDegrees = 0;
  }
  return rotationInDegrees;
}
