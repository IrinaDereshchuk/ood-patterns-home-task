import { CreationalClient } from './creational';

import { StructuralClient } from './structural';

import { BehaviorAClient } from './behavior/a';
import { BehaviorBClient } from './behavior/b';
import { BehaviorCClient } from './behavior/c';

StructuralClient.main();

CreationalClient.main();

BehaviorAClient.main();
BehaviorBClient.main();
BehaviorCClient.main();