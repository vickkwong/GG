//
//  SendMessageViewController.m
//  Rainbros
//
//  Created by Victoria Kwong on 5/20/14.
//  Copyright (c) 2014 Victoria. All rights reserved.
//

#import "SendMessageViewController.h"
#import "ViewAllMessagesViewController.h"

@interface SendMessageViewController ()
@property NSArray *friendsArray;
@property int numFriendsSelected;
@property NSMutableArray *friendsSelected;
@property BOOL messagesSent;
@property (weak, nonatomic) IBOutlet UIButton *sendButton;
@end

@implementation SendMessageViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.navigationController.navigationBar.topItem.title = @"";
    self.numFriendsSelected = 0;
    self.sendButton.hidden = YES;
    self.friendsSelected = [[NSMutableArray alloc] init];
    self.messagesSent = NO;
    
    NSString *getFriendsURL = [[NSString alloc]initWithFormat:@"%@%@", @"http://www.stanford.edu/~vkwong/cgi-bin/Rainbros/findFriends.php?username=", self.userName];
    
    NSLog(@"%@", getFriendsURL);
    
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:getFriendsURL]];
    
    NSURLResponse *response = (NSURLResponse *)request;
    
    NSError *e;
    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&e];
    self.friendsArray = [[NSArray alloc] init];
    self.friendsArray = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&e];
    
    NSLog(@"%@", self.friendsArray);
    
    UITableView *tableView = (UITableView *)[self.view viewWithTag:1];
    [tableView reloadData];

}

- (void) viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    self.navigationController.navigationBar.hidden = NO;
    NSLog(@"%@", self.userName);

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [self.friendsArray count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Friend Cell"];
    UILabel *friendName = (UILabel *)[cell viewWithTag:0];
    friendName.text = self.friendsArray[indexPath.row];
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    UILabel *friendName = (UILabel *)[cell viewWithTag:0];
    
    if (cell.accessoryType == UITableViewCellAccessoryNone) {
        cell.accessoryType = UITableViewCellAccessoryCheckmark;
        self.numFriendsSelected++;
        [self.friendsSelected addObject:friendName.text];
    } else {
    	cell.accessoryType = UITableViewCellAccessoryNone;
        self.numFriendsSelected--;
        [self.friendsSelected removeObject:friendName.text];
    }
    if (self.numFriendsSelected > 0) {
        self.sendButton.hidden = NO;
    } else {
        self.sendButton.hidden = YES;
    }
}

- (IBAction)sendMessages:(id)sender {
    NSString *allFriendsString = [self.friendsSelected componentsJoinedByString:@"@@@@@"];
    NSString *sendMessageURL = [[NSString alloc]initWithFormat:@"%@%@%@%@%@%@%@%@", @"http://www.stanford.edu/~vkwong/cgi-bin/Rainbros/sendMessage.php?sender=", self.userName, @"&recipient=", allFriendsString, @"&message=", self.message, @"&color=", self.color];
    
    NSLog(@"%@", sendMessageURL);
    
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:sendMessageURL]];
    
    NSURLResponse *response = (NSURLResponse *)request;
    
    NSError *e;
    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&e];
    NSArray *jsonArray = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&e];
    if ([jsonArray count] == [self.friendsSelected count]) {
        self.messagesSent = YES;
        [self performSegueWithIdentifier:@"sentMessage" sender:self];
    }
}


#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    if ([segue.identifier isEqualToString:@"sentMessage"]) {
        if ([segue.destinationViewController isKindOfClass:[ViewAllMessagesViewController class]]) {
            ViewAllMessagesViewController *dest = (ViewAllMessagesViewController *)segue.destinationViewController;
            dest.userName = self.userName;
        }
    }

}


@end
