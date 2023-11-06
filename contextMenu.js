import OBR from "@owlbear-rodeo/sdk";

const ID = "jjsoini.pulpscape.shuffle";

export function setupContextMenu() {

    function checkDuplicates(arr) {

        var pastIndices = [];
        var duplicates = true;
    
        while(duplicates) {
            pastIndices = [];
            duplicates = false;
            for (let i = 0; i < arr.length; i++) {
                if (pastIndices.includes(arr[i].zIndex)) {
                    duplicates = true;
                    arr[i].zIndex += Math.floor(Math.random() * 1000);
                }
                pastIndices.push(arr[i].zIndex);
                
            }
        }  
    }
    
    function shuffleZIndices(arr) {
        const zIndices = arr.map(item => item.zIndex);
        let position;
        let coverIndex = 0;
        // Fisher-Yates Shuffle Algorithm
        for (let i = zIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [zIndices[i], zIndices[j]] = [zIndices[j], zIndices[i]];
        }      
      
        for (let i = 0; i < arr.length; i++) {
          arr[i].zIndex = zIndices[i];
          if (i === 0) {
            position = arr[i].position;
          } else {
            arr[i].position = position;
          }
          arr[i].rotation = 0;
        }
    }

  OBR.contextMenu.create({
    id: `${ID}/context-menu`,
    icons: [
      {
        icon: "/icon.svg",
        label: "Shuffle",
        filter: {
          min: 2,
          roles: ["GM"],
        },
      },
    ],
    onClick(context) {

        OBR.scene.items.updateItems(context.items, (items) => {
            checkDuplicates(items);
            shuffleZIndices(items);
        });

    },
  });
}

